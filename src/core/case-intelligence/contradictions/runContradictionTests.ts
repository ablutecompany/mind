import { SessionCaseState } from '../state/sessionCaseState';
import { CaseRealityMap } from '../types';
import { ContradictionResult } from './types';
import { ruleCatalog } from './ruleCatalog';
import { getRuleForQuestion } from './questionLinks';

export function runContradictionTests(
  sessionState: SessionCaseState,
  caseRealityMap: CaseRealityMap
): ContradictionResult[] {
  const results: ContradictionResult[] = [];
  
  // 1. Identify which domains to test: Dominant + Next Top
  const domainsToTest = new Set<string>();
  if (caseRealityMap.dominantDomain) {
    domainsToTest.add(caseRealityMap.dominantDomain);
  }
  const topDomains = sessionState.caseFingerprint?.topDomains || [];
  if (topDomains.length > 1) {
    domainsToTest.add(topDomains[1]);
  }

  // Check the Ledger to see if any contradictor questions were answered
  const answeredContradictors = sessionState.evidenceLedger.filter(
    (e: any) => e.signalType === 'support' || e.signalType === 'conflict' || e.signalType === 'constraint' || e.signalType === 'pain' 
  );

  for (const domain of domainsToTest) {
    const rules = ruleCatalog.filter(r => r.targetDomain === domain);
    
    for (const rule of rules) {
      // Analyze evidence vs rule
      const evidenceLabels = sessionState.evidenceLedger.filter((e: any) => e.domain === domain).map((e: any) => e.label as string);
      
      const weakened = rule.weakensIf.some(w => evidenceLabels.includes(w));
      const survived = rule.survivesIf.some(s => evidenceLabels.includes(s));
      const tested = weakened || survived;
      
      if (tested) {
        results.push({
          targetDomain: domain,
          tested: true,
          survived: survived && !weakened,
          weakened: weakened,
          unresolved: survived && weakened, // Both fires means conflicting evidence
          evidenceFor: evidenceLabels.filter(e => rule.survivesIf.includes(e)),
          evidenceAgainst: evidenceLabels.filter(e => rule.weakensIf.includes(e)),
          confidenceDelta: weakened ? -0.3 : (survived ? +0.2 : 0)
        });
      } else {
        results.push({
          targetDomain: domain,
          tested: false,
          survived: false,
          weakened: false,
          unresolved: true,
          evidenceFor: [],
          evidenceAgainst: [],
          confidenceDelta: 0
        });
      }
    }
  }

  return results;
}
