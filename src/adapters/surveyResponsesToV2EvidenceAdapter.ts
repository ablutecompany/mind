// src/adapters/surveyResponsesToV2EvidenceAdapter.ts
import { EvidenceItem } from '../contracts/inferenceTypes';
import { SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { RivalEvidence } from '../services/rivalHypothesisEngine';
// @ts-ignore
import { SURVEY_QUESTIONS } from '../../public/surveyQuestions.js';

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
      
      const question = SURVEY_QUESTIONS.find((q: any) => q.questionId === ans.questionId);
      if (!question) return; // Silent skip if not found

      const option = question.options.find((o: any) => o.optionId === ans.selectedOptionId);
      if (!option) return;

      // Extract Signal Weights for Base A (Direct Core Tracks)
      if (option.signalWeights) {
        Object.entries(option.signalWeights).forEach(([signalName, weightVal]) => {
            const numWeight = Number(weightVal);
            if (!isNaN(numWeight)) {
                // Determine polarity
                const polarity = numWeight >= 0 ? "for" : "against";
                const absoluteWeight = Math.abs(numWeight);

                // Blocks 1-4 logic usually maps to BaseA
                // Blocks 5+ logic usually maps to BaseB (Symbolic) and Deepening
                const numericBlock = parseInt(block.blockId.replace('block_', ''), 10);

                if (numericBlock === 5) {
                    baseB_signals.push({
                        fieldId: 'money' as any, // Temporary bypass since the engine is heavily typed
                        axisTriggered: signalName as any,
                        weight: absoluteWeight,
                        linkedCoreProblem: signalName as any
                    });
                } else if (numericBlock > 5) {
                     deepening_signals.push({
                        hypothesisId: 'custom_hipotheses_v3' as any,
                        signal: signalName,
                        weight: absoluteWeight,
                        polarity: polarity
                     });
                     // We also push to BaseA to ensure it's not lost by basic inference limits.
                     baseA_signals.push({
                         sourceId: ans.questionId,
                         signal: signalName,
                         weight: absoluteWeight,
                         polarity: polarity
                     });
                } else {
                    baseA_signals.push({
                        sourceId: ans.questionId,
                        signal: signalName,
                        weight: absoluteWeight,
                        polarity: polarity
                    });
                }
            }
        });
      }
    });
  });

  return { baseA_signals, baseB_signals, deepening_signals, blocksAnswered, rawAnswers };
}
