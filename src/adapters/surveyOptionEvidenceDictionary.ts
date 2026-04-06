// src/adapters/surveyOptionEvidenceDictionary.ts
import { CoreProblemId } from '../contracts/coreProblemOntology';
import { LifeFieldId, LatentAxisId } from '../contracts/symbolicLifeFieldTypes';
import { ClusterRivalHypothesisId } from '../contracts/clusterDiscriminativeTypes';

export type SurveyBlockType = 'superficial' | 'symbolic' | 'deepening';

export interface EvidenceMappingParams {
  block: SurveyBlockType;
  signal_A?: { id: CoreProblemId; weight: number; polarity: 'for'|'against' };
  signal_B?: { fieldId: LifeFieldId; axisId: LatentAxisId; weight: number; linkedCore?: CoreProblemId };
  signal_Deepening?: { hypothesisId: ClusterRivalHypothesisId; weight: number; polarity: 'for'|'against' };
}

// =========================================================================
// DICIONÁRIO CENTRALIZADO E AUDITÁVEL (O TRADUTOR DA V2)
// Neste momento, reflete os 15 núcleos ontológicos e cobre blocos de simulação.
// =========================================================================
export const SurveyOptionDictionary: Record<string, EvidenceMappingParams> = {
  // --- BASE A (NÚCLEOS DE SOFRIMENTO) ---
  'opt_A1_fuga': { block: 'superficial', signal_A: { id: 'medo', weight: 1.0, polarity: 'for' }},
  'opt_A2_adiar': { block: 'superficial', signal_A: { id: 'procrastinacao', weight: 0.8, polarity: 'for' }},
  'opt_A3_vergonha': { block: 'superficial', signal_A: { id: 'baixa_autoestima', weight: 1.2, polarity: 'for' }},
  'opt_A4_desgaste_relacional': { block: 'superficial', signal_A: { id: 'relacoes_dificeis', weight: 1.0, polarity: 'for' }},
  'opt_A5_ambivalencia': { block: 'superficial', signal_A: { id: 'conflitos_internos', weight: 1.0, polarity: 'for' }},
  'opt_A6_ruido_vazio': { block: 'superficial', signal_A: { id: 'ansiedade', weight: 0.8, polarity: 'for' }},
  
  // --- BASE B (CAMPOS SIMBÓLICOS) ---
  'opt_B1_casa_sufoco': { block: 'symbolic', signal_B: { fieldId: 'casa_territorio', axisId: 'sovereignty', weight: 1.0, linkedCore: 'medo' }},
  'opt_B2_trabalho_identidade': { block: 'symbolic', signal_B: { fieldId: 'trabalho_progresso', axisId: 'valueDependenceOnProgress', weight: 1.0, linkedCore: 'baixa_autoestima' }},
  'opt_B3_rotina_apagada': { block: 'symbolic', signal_B: { fieldId: 'rotina_vitalidade', axisId: 'mourningForLostTime', weight: 0.8, linkedCore: 'falta_sentido' }},

  // --- DEEPENING (CLUSTER DISCRIMINATIVO 1) ---
  'opt_D1_evita_critica': { block: 'deepening', signal_Deepening: { hypothesisId: 'fear_of_failure', weight: 1.0, polarity: 'for' }},
  'opt_D2_cria_desvios': { block: 'deepening', signal_Deepening: { hypothesisId: 'avoidant_procrastination', weight: 1.0, polarity: 'for' }},
  'opt_D3_precisa_agradar': { block: 'deepening', signal_Deepening: { hypothesisId: 'approval_dependence', weight: 1.0, polarity: 'for' }},
  'opt_D4_auto_valor_ferido': { block: 'deepening', signal_Deepening: { hypothesisId: 'low_self_worth', weight: 1.2, polarity: 'for' }},
  'opt_D5_ambiguidade_voltar_atras': { block: 'deepening', signal_Deepening: { hypothesisId: 'inner_conflict', weight: 1.0, polarity: 'for' }},
};

export function getMappingForOption(optionId: string): EvidenceMappingParams | undefined {
  return SurveyOptionDictionary[optionId];
}

// Para o relatório final:
export function getDictionaryCoverageReport() {
  const keys = Object.keys(SurveyOptionDictionary);
  const blockCounts = { superficial: 0, symbolic: 0, deepening: 0 };
  
  keys.forEach(k => {
    const val = SurveyOptionDictionary[k];
    blockCounts[val.block]++;
  });

  return {
    totalOptionsMapped: keys.length,
    blockCoverage: blockCounts
  };
}
