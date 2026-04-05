import { CaseRealityMap, DomainKey, ConfidenceLevel, EvidenceSignal } from '../types';

export interface ReportContext {
  dominantDomain: DomainKey | null;
  dominantProblem: string | null;
  dominantPain: string | null;
  dominantConstraint: string | null;
  dominantDesire: string | null;
  dominantConflict: string | null;
  validatedFacts: string[];
  probableReadings: string[];
  inconclusiveAreas: string[];
  anchoredObjects: string[];
  confidenceLevel: ConfidenceLevel;
  uncertaintyFlags: string[];
}

export function createReportContext(
  realityMap: CaseRealityMap,
  ledger: EvidenceSignal[]
): ReportContext {
  const validatedFacts: string[] = [];
  const probableReadings: string[] = [];
  const inconclusiveAreas: string[] = [];

  // Anchor validated facts on strong supporting evidence
  ledger.filter(e => e.polarity === 'supporting' && e.strength >= 0.8).forEach(e => {
    validatedFacts.push(`Fato forte no domínio ${e.domain}: ${e.label}`);
  });

  // Probable readings from medium strength signals
  ledger.filter(e => e.polarity === 'supporting' && e.strength >= 0.5 && e.strength < 0.8).forEach(e => {
    probableReadings.push(`Cenário provável: ${e.label}`);
  });

  // Inconclusive areas derived from contradictions and weak signals
  if (realityMap.contradictoryEvidence.length > 0) {
    inconclusiveAreas.push('Existem indícios contraditórios nas respostas relativas às motivações reais da pessoa.');
  }
  if (realityMap.uncertaintyFlags.includes('no_clear_domain_separation')) {
    inconclusiveAreas.push('O domínio principal do problema ainda não está cristalizado com rigor. Várias áreas competem.');
  }
  if (realityMap.confidenceLevel === 'low') {
    inconclusiveAreas.push('O volume de informação concreta ainda é insuficiente para deduções afirmativas.');
  }

  // Collect anchored objects directly linked to strong evidence
  const objectsSet = new Set<string>();
  ledger.forEach(e => { if (e.objectRef) objectsSet.add(e.objectRef); });

  return {
    dominantDomain: realityMap.dominantDomain,
    dominantProblem: realityMap.dominantProblem,
    dominantPain: realityMap.dominantPain,
    dominantConstraint: realityMap.dominantConstraint,
    dominantDesire: realityMap.dominantDesire,
    dominantConflict: realityMap.dominantConflict,
    validatedFacts,
    probableReadings,
    inconclusiveAreas,
    anchoredObjects: Array.from(objectsSet),
    confidenceLevel: realityMap.confidenceLevel,
    uncertaintyFlags: realityMap.uncertaintyFlags,
  };
}
