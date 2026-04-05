import { SessionCaseState } from '../state/sessionCaseState';

export const selectEvidenceLedger = (state: SessionCaseState) => state.evidenceLedger;
export const selectActiveDomains = (state: SessionCaseState) => state.activeDomains;
export const selectRejectedDomains = (state: SessionCaseState) => state.rejectedDomains;

export const selectDominantDomain = (state: SessionCaseState) => state.caseRealityMap?.dominantDomain || null;
export const selectDominantProblem = (state: SessionCaseState) => state.caseRealityMap?.dominantProblem || null;
export const selectDominantConstraint = (state: SessionCaseState) => state.caseRealityMap?.dominantConstraint || null;
export const selectDominantDesire = (state: SessionCaseState) => state.caseRealityMap?.dominantDesire || null;

export const selectUncertaintyFlags = (state: SessionCaseState) => state.caseRealityMap?.uncertaintyFlags || [];
export const selectConfidenceLevel = (state: SessionCaseState) => state.caseRealityMap?.confidenceLevel || 'low';

export const selectCaseFingerprintSummary = (state: SessionCaseState) => {
  const fp = state.caseFingerprint;
  if (!fp) return null;
  return {
    narrative: fp.dominantNarrativeShape,
    domains: fp.topDomains,
    pains: fp.topPains,
    blockers: fp.topBlockers,
    signalsCount: fp.topEvidenceSignals.length
  };
};
