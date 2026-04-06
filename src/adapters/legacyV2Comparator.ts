// src/adapters/legacyV2Comparator.ts
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';
import { V2UIPayload } from '../presenters/reflectionResultsPresenterV2';

// O que a app antiga tipicamente devolvia (exemplo simulado para ponte)
export interface LegacyMockOutput {
  dominantIssues: string[];
  secondaryIssues: string[];
  vagueNarrativeSummary: string;
}

export interface ComparisonReport {
  legacyTopicsCount: number;
  v2HierarchicalDepth: boolean;
  improvedDiscrimination: boolean;
  legacyReadiness: string;
  v2Outcome: string;
}

export function compareLegacyVsV2(
  legacyResult: LegacyMockOutput,
  v2Raw: FinalPsychologicalSynthesis,
  v2UI: V2UIPayload
): ComparisonReport {
  
  const legacyTopicsCount = legacyResult.dominantIssues.length + legacyResult.secondaryIssues.length;
  
  // Na V2 o dominante é estrito (1 núcleo) + 1 defesa + 1 conflito
  const v2HierarchicalDepth = !!(v2Raw.dominantProblem || v2Raw.centralConflict) && 
                              (v2Raw.rivalHypothesisOpen === null);

  const improvedDiscrimination = legacyTopicsCount > 2 && v2HierarchicalDepth;

  return {
    legacyTopicsCount,
    v2HierarchicalDepth,
    improvedDiscrimination,
    legacyReadiness: `Legacy devolveu ${legacyTopicsCount} temas numa lista plana: ${legacyResult.dominantIssues.join(', ')}`,
    v2Outcome: `V2 transformou isto numa árvore hierárquica: Núcleo=[${v2Raw.dominantProblem}], Defesa=[${v2Raw.primaryDefense}], Contexto=[${v2Raw.lifeFieldMostCharged}]`
  };
}
