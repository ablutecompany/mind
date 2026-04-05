import { ReportGenerationInput } from '../report/types';
import { DomainKey } from '../types';
import { RecognitionPack, RecognitionCandidate } from './types';
import { RECOGNITION_TEMPLATES } from './templates';
import { evaluateCandidate } from './filters';

export function generateRecognitionLines(input: ReportGenerationInput): RecognitionPack {
  const activeDomains = new Set<DomainKey>();
  
  if (input.caseRealityMap.dominantDomain) {
    activeDomains.add(input.caseRealityMap.dominantDomain);
  }
  input.caseFingerprint.topDomains.forEach(d => activeDomains.add(d));

  const allCandidates: RecognitionCandidate[] = [];

  // Match active domains against strict templates
  activeDomains.forEach(domain => {
    const rulesForDomain = RECOGNITION_TEMPLATES.filter(r => r.domain === domain);
    
    // Check if we have strong enough signals for this domain
    const evidenceForDomain = input.caseRealityMap.supportingEvidence.filter(e => e.domain === domain);
    const hasConstraint = evidenceForDomain.some(e => e.signalType === 'constraint' || e.signalType === 'cost_of_change');
    const hasPain = evidenceForDomain.some(e => e.signalType === 'pain');
    const avgScore = evidenceForDomain.length > 0 
      ? evidenceForDomain.reduce((acc, curr) => acc + curr.strength, 0) / evidenceForDomain.length 
      : 0;

    rulesForDomain.forEach((rule, idx) => {
      // Condition checks
      if (rule.minEvidenceScore > avgScore) return;
      if (rule.requiresConstraint && !hasConstraint) return;
      if (rule.requiresPain && !hasPain) return;

      // Integrate Contradictors
      const domainContradictors = input.contradictionResults.filter(c => c.targetDomain === domain);
      const isWeakened = domainContradictors.some(c => c.weakened);
      const isUnresolved = domainContradictors.some(c => c.unresolved);
      
      let adjustedScore = avgScore;
      if (isWeakened) adjustedScore -= 0.3;
      if (isUnresolved) adjustedScore -= 0.1;

      // Calculate dynamic abstraction and duplication risk rather than hardcoding
      const dynamicAbstraction = (rule.template.includes('talvez') || rule.template.match(/parece/g)) ? 0.35 : 0.15;
      const dynamicDupRisk = input.reportContext.inconclusiveAreas.includes(domain) ? 0.6 : 0.1;

      // Create a candidate
      allCandidates.push({
        id: `CAND_${rule.id}_${idx}`,
        text: rule.template,
        targetDomain: domain,
        evidenceSupportScore: Math.max(0, adjustedScore),
        domainAnchoringScore: input.caseRealityMap.dominantDomain === domain ? 0.95 : 0.6,
        abstractionScore: dynamicAbstraction,
        duplicationRisk: dynamicDupRisk
      });
    });
  });

  // Score and filter candidates
  const evaluatedCandidates = allCandidates.map(c => {
    const passed = evaluateCandidate(c);
    if (!passed) {
      return { ...c, rejected: true, rejectionReasons: ['failed_strict_filters'] };
    }
    return c;
  });

  // Pick top 2 to 4 lines max
  const approved = evaluatedCandidates.filter(c => !c.rejected);
  
  // Sort by highest evidence score
  approved.sort((a, b) => b.evidenceSupportScore - a.evidenceSupportScore);
  
  const finalSelect = approved.slice(0, 4).map(c => c.text);

  return {
    candidatesEval: evaluatedCandidates,
    finalLines: finalSelect
  };
}
