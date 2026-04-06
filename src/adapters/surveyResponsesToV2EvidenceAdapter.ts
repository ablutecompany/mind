// src/adapters/surveyResponsesToV2EvidenceAdapter.ts
import { EvidenceItem } from '../contracts/inferenceTypes';
import { SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { RivalEvidence } from '../services/rivalHypothesisEngine';
import { getMappingForOption } from './surveyOptionEvidenceDictionary';

export interface LegacySurveyBlock {
  blockId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export interface V2RunnerInputFull {
  baseA_signals: EvidenceItem[];
  baseB_signals: SymbolicEvidence[];
  deepening_signals: RivalEvidence[];
  blocksAnswered: number;
  rawAnswers: { questionId: string, selectedOptionId: string }[];
}

export function convertSurveyToV2Input(legacyBlocks: LegacySurveyBlock[]): V2RunnerInputFull {
  const baseA_signals: EvidenceItem[] = [];
  const baseB_signals: SymbolicEvidence[] = [];
  const deepening_signals: RivalEvidence[] = [];
  const rawAnswers: { questionId: string, selectedOptionId: string }[] = [];
  
  const blocksAnswered = legacyBlocks.length;

  legacyBlocks.forEach(block => {
    block.answers.forEach(ans => {
      rawAnswers.push(ans);
      const mapping = getMappingForOption(ans.selectedOptionId);
      
      if (!mapping) {
        // Fallback dinâmico para evitar dicionarizar dezenas de ID's repetitivos do Survey
        const sid = ans.selectedOptionId;
        let inferredCore = null;
        if (sid.includes('_meios')) inferredCore = 'meios';
        if (sid.includes('_apoio') || sid.includes('_relacionamento')) inferredCore = 'apoio';
        if (sid.includes('_liberdade') || sid.includes('_condicionado')) inferredCore = 'liberdade';
        if (sid.includes('_energia') || sid.includes('_cansado') || sid.includes('_desgaste')) inferredCore = 'energia';
        if (sid.includes('_direcao') || sid.includes('_rumo') || sid.includes('_perdido')) inferredCore = 'direcao';
        if (sid.includes('_vida') || sid.includes('_brilho') || sid.includes('_apagada') || sid.includes('_adiada')) inferredCore = 'vida';
        if (sid.includes('_nevoa') || sid.includes('_misturado')) inferredCore = 'baixa_diferenciacao';

        if (inferredCore) {
           baseA_signals.push({
             sourceId: ans.questionId,
             signal: inferredCore,
             weight: 1.0,
             polarity: 'for'
           });
        }
        return; // done
      }
      
      if (mapping.signal_A) {
        baseA_signals.push({
           sourceId: ans.questionId,
           signal: mapping.signal_A.id,
           weight: mapping.signal_A.weight,
           polarity: mapping.signal_A.polarity
        });
      }

      if (mapping.signal_B) {
         baseB_signals.push({
            fieldId: mapping.signal_B.fieldId,
            axisTriggered: mapping.signal_B.axisId,
            weight: mapping.signal_B.weight,
            linkedCoreProblem: mapping.signal_B.linkedCore!
         });
      }

      if (mapping.signal_Deepening) {
         deepening_signals.push({
            hypothesisId: mapping.signal_Deepening.hypothesisId,
            signal: ans.questionId,
            weight: mapping.signal_Deepening.weight,
            polarity: mapping.signal_Deepening.polarity
         });
      }
    });
  });

  return { baseA_signals, baseB_signals, deepening_signals, blocksAnswered, rawAnswers };
}
