// src/contracts/finalSynthesisTypes.ts
import { LifeFieldId } from './symbolicLifeFieldTypes';
import { ClusterRivalHypothesisId } from './clusterDiscriminativeTypes';

export interface FinalPsychologicalSynthesis {
  manifestTheme: string;
  latentTheme: string;
  dominantProblem: ClusterRivalHypothesisId | string | null;
  supportingProblem: ClusterRivalHypothesisId | string | null;
  primaryDefense: ClusterRivalHypothesisId | string | null;
  centralConflict: ClusterRivalHypothesisId | string | null;
  lifeFieldMostCharged: LifeFieldId | null;
  likelyVisibleBehaviors: string[];
  confidence: 'insufficient_to_close' | 'rival_open' | 'dominant_probable' | 'dominant_strong';
  rivalHypothesisOpen: string[] | null;
  unknowns: string[];
}
