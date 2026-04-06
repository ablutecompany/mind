// src/adapters/surveyResponsesToV2EvidenceAdapter.ts
import { EvidenceItem } from '../contracts/inferenceTypes';
import { SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { RivalEvidence } from '../services/rivalHypothesisEngine';
import { V2RunnerInputFull } from '../facades/useReflectionInferenceV2';
import { getMappingForOption } from './surveyOptionEvidenceDictionary';

export interface LegacySurveyBlock {
  blockId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export function convertSurveyToV2Input(legacyBlocks: LegacySurveyBlock[]): V2RunnerInputFull {
  const baseA_signals: EvidenceItem[] = [];
  const baseB_signals: SymbolicEvidence[] = [];
  const deepening_signals: RivalEvidence[] = [];

  legacyBlocks.forEach(block => {
    block.answers.forEach(ans => {
      const mapping = getMappingForOption(ans.selectedOptionId);
      if (!mapping) return; // Se a opção não estiver no dicionário, ignora com segurança
      
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

  return { baseA_signals, baseB_signals, deepening_signals };
}
