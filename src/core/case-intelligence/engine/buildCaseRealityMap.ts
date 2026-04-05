import { CaseRealityMap, DomainKey, EvidenceSignal, ConfidenceLevel, UncertaintyFlag } from '../types';

interface DomainScore {
  domain: DomainKey;
  score: number;
}

export function buildCaseRealityMap(evidenceLedger: EvidenceSignal[]): CaseRealityMap {
  const domainScores = scoreDomainsFromEvidence(evidenceLedger);
  
  let dominantDomain: DomainKey | null = null;
  let secondaryDomains: DomainKey[] = [];
  
  if (domainScores.length > 0) {
    const topScore = domainScores[0].score;
    // Require a minimum separation of 0.2 to safely declare a dominant domain
    if (domainScores.length === 1 || (domainScores.length > 1 && (topScore - domainScores[1].score) > 0.2)) {
      dominantDomain = domainScores[0].domain;
    }
    
    secondaryDomains = domainScores
      .filter(ds => ds.domain !== dominantDomain)
      .map(ds => ds.domain)
      .slice(0, 3);
  }

  const confidenceLevel = deriveConfidenceLevel(dominantDomain, evidenceLedger.length);
  const uncertaintyFlags = deriveUncertaintyFlags(dominantDomain, domainScores, evidenceLedger);
  
  const dominantProblem = detectDominantProblem(dominantDomain, evidenceLedger);
  const dominantPain = detectDominantPain(dominantDomain, evidenceLedger);
  const dominantConstraint = detectDominantConstraint(dominantDomain, evidenceLedger);
  const dominantDesire = detectDominantDesire(dominantDomain, evidenceLedger);
  const dominantConflict = detectDominantConflict(dominantDomain, evidenceLedger);

  const dominantBlockers = collectDominantBlockers(evidenceLedger);
  const dominantCostsOfChange = collectCostsOfChange(evidenceLedger);
  const dominantCostsOfStaying = collectCostsOfStaying(evidenceLedger);
  
  const supportingEvidence = evidenceLedger.filter(e => e.polarity === 'supporting');
  const contradictoryEvidence = evidenceLedger.filter(e => e.polarity === 'contradictory');

  const likelyInternalDrivers = deriveLikelyInternalDrivers(dominantDomain, dominantPain, dominantDesire);

  return {
    dominantDomain,
    secondaryDomains,
    dominantProblem,
    dominantPain,
    dominantConstraint,
    dominantDesire,
    dominantConflict,
    dominantBlockers,
    dominantCostsOfChange,
    dominantCostsOfStaying,
    supportingEvidence,
    contradictoryEvidence,
    likelyInternalDrivers,
    uncertaintyFlags,
    confidenceLevel,
    caseFingerprint: null,
    reportableInsights: [],
    recognitionLines: [],
    rejectedGenericInsights: []
  };
}

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

function scoreDomainsFromEvidence(evidenceLedger: EvidenceSignal[]): DomainScore[] {
  const scores: Partial<Record<DomainKey, number>> = {};
  
  evidenceLedger.forEach(ev => {
    if (ev.polarity === 'contradictory') return; // simplistic: ignore contradictory for domain primacy
    
    let weight = ev.strength;
    if (ev.signalType === 'pain' || ev.signalType === 'conflict') weight *= 1.5;
    
    scores[ev.domain] = (scores[ev.domain] || 0) + weight;
  });

  return Object.entries(scores)
    .map(([domain, score]) => ({ domain: domain as DomainKey, score: score as number }))
    .sort((a, b) => b.score - a.score);
}

function detectDominantProblem(domain: DomainKey | null, ledger: EvidenceSignal[]): string | null {
  if (!domain) return null;
  const painOrConflict = ledger.find(e => e.domain === domain && (e.signalType === 'pain' || e.signalType === 'conflict'));
  return painOrConflict ? `Conflito centrado em ${painOrConflict.label}` : `Conflito base latente`;
}

function detectDominantPain(domain: DomainKey | null, ledger: EvidenceSignal[]): string | null {
  if (!domain) return null;
  const pain = ledger.find(e => e.domain === domain && e.signalType === 'pain');
  return pain ? pain.label : null;
}

function detectDominantConstraint(domain: DomainKey | null, ledger: EvidenceSignal[]): string | null {
  if (!domain) return null;
  const constraint = ledger.find(e => e.domain === domain && e.signalType === 'constraint');
  return constraint ? constraint.label : null;
}

function detectDominantDesire(domain: DomainKey | null, ledger: EvidenceSignal[]): string | null {
  if (!domain) return null;
  const desire = ledger.find(e => e.domain === domain && e.signalType === 'desire');
  return desire ? desire.label : null;
}

function detectDominantConflict(domain: DomainKey | null, ledger: EvidenceSignal[]): string | null {
  if (!domain) return null;
  const conflict = ledger.find(e => e.domain === domain && e.signalType === 'conflict');
  return conflict ? conflict.label : null;
}

function collectDominantBlockers(ledger: EvidenceSignal[]): string[] {
  return ledger.filter(e => e.signalType === 'constraint').map(e => e.label).slice(0, 3);
}

function collectCostsOfChange(ledger: EvidenceSignal[]): string[] {
  return ledger.filter(e => e.signalType === 'cost_of_change').map(e => e.label).slice(0, 3);
}

function collectCostsOfStaying(ledger: EvidenceSignal[]): string[] {
  return ledger.filter(e => e.signalType === 'cost_of_staying').map(e => e.label).slice(0, 3);
}

function deriveLikelyInternalDrivers(
  domain: DomainKey | null, 
  pain: string | null, 
  desire: string | null
): string[] {
  // Only filled AFTER reality mapping
  if (!domain) return [];
  const drivers: string[] = [];
  if (pain) drivers.push(`Aversão a: ${pain}`);
  if (desire) drivers.push(`Busca por: ${desire}`);
  return drivers;
}

function deriveUncertaintyFlags(domain: DomainKey | null, scores: DomainScore[], ledger: EvidenceSignal[]): UncertaintyFlag[] {
  const flags: UncertaintyFlag[] = [];
  if (!domain) flags.push('no_clear_domain_separation');
  
  const contradictions = ledger.filter(e => e.polarity === 'contradictory');
  if (contradictions.length > 0) {
    flags.push(`high_contradiction_count_${contradictions.length}`);
  }
  
  if (scores.length > 1 && domain) {
    const diff = scores[0].score - scores[1].score;
    if (diff <= 0.2) {
      flags.push('competing_hypotheses_close_score');
    }
  }

  return flags;
}

function deriveConfidenceLevel(domain: DomainKey | null, ledgerSize: number): ConfidenceLevel {
  if (!domain) return 'low';
  if (ledgerSize < 3) return 'low';
  if (ledgerSize >= 8) return 'high';
  return 'medium';
}
