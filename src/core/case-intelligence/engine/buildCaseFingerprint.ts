import { CaseFingerprint, CaseRealityMap, EvidenceSignal, NarrativeShapeKey } from '../types';

export function buildCaseFingerprint(
  realityMap: CaseRealityMap,
  ledger: EvidenceSignal[]
): CaseFingerprint | null {
  // If reality map strongly low confidence, fingerprint cannot be solidly constructed
  if (realityMap.confidenceLevel === 'low' && !realityMap.dominantDomain) {
    return null;
  }

  const topDomains = realityMap.dominantDomain 
    ? [realityMap.dominantDomain, ...realityMap.secondaryDomains].slice(0, 3)
    : realityMap.secondaryDomains.slice(0, 3);

  const topPains = realityMap.dominantPain 
    ? [realityMap.dominantPain] 
    : ledger.filter(e => e.signalType === 'pain').map(e => e.label).slice(0, 3);

  const topBlockers = realityMap.dominantBlockers.slice(0, 3);

  const topDesires = realityMap.dominantDesire 
    ? [realityMap.dominantDesire] 
    : ledger.filter(e => e.signalType === 'desire').map(e => e.label).slice(0, 3);

  const topConflicts = realityMap.dominantConflict 
    ? [realityMap.dominantConflict] 
    : ledger.filter(e => e.signalType === 'conflict').map(e => e.label).slice(0, 3);

  // Take the strongest overall evidence signals
  const topEvidenceSignals = ledger
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 5)
    .map(e => e.label);

  const dominantNarrativeShape = deriveNarrativeShape(realityMap);

  const rejectionProfile = realityMap.rejectedGenericInsights.map(r => r.id);
  const uncertaintyProfile = realityMap.uncertaintyFlags;

  return {
    topDomains,
    topPains,
    topBlockers,
    topDesires,
    topConflicts,
    topEvidenceSignals,
    dominantNarrativeShape,
    rejectionProfile,
    uncertaintyProfile,
  };
}

function deriveNarrativeShape(realityMap: CaseRealityMap): NarrativeShapeKey | null {
  const dom = realityMap.dominantDomain;
  if (!dom) return 'cenario_difuso_com_sinais_conflituantes';

  // Naive but concrete mapping based on dominant domain and blocks
  if (dom === 'autonomia_vs_pertenca' && realityMap.dominantBlockers.length > 0) {
    return 'autonomia_bloqueada_por_falta_de_margem';
  }
  if (dom === 'centro_afetivo_deslocado' && realityMap.dominantConstraint) {
    return 'permanencia_por_estrutura_com_centro_afetivo_dividido';
  }
  if (dom === 'habitacao_espaco_autonomia') {
    return 'vida_adulta_adiada_por_falta_de_espaco';
  }
  if (dom === 'trabalho_desgaste_reconhecimento') {
    return 'desgaste_funcional_com_sentido_erodido';
  }
  if (realityMap.dominantCostsOfChange.length > 0) {
    return 'prudencia_extrema_com_decisao_suspensa';
  }

  // Fallback but concrete
  return `ancorado_em_${dom}`;
}
