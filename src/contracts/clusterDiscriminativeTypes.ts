// src/contracts/clusterDiscriminativeTypes.ts

export type ClusterRivalHypothesisId = 
  | 'low_self_worth'
  | 'approval_dependence'
  | 'comparison_driven_fragility'
  | 'fear_of_failure'
  | 'avoidant_procrastination'
  | 'inner_conflict';

export type HierarchyRole = 'dominant' | 'supporting' | 'defense' | 'symptom' | 'aggravator' | 'rejected' | 'competing';

export interface EvaluatedHypothesis {
  id: ClusterRivalHypothesisId;
  role: HierarchyRole;
  activationScore: number;
  evidenceFor: string[];
  evidenceAgainst: string[];
}

export interface DeepeningClusterOutput {
  dominantProblem: ClusterRivalHypothesisId | null;
  supportingProblem: ClusterRivalHypothesisId | null;
  primaryDefense: ClusterRivalHypothesisId | null;
  centralConflict: ClusterRivalHypothesisId | null;
  evidenceSummary: string[];
  counterEvidenceSummary: string[];
  confidence: 'low' | 'medium' | 'high';
  rivalHypothesisOpen: ClusterRivalHypothesisId[] | null;
  evaluatedHypotheses: Record<ClusterRivalHypothesisId, EvaluatedHypothesis>;
}
