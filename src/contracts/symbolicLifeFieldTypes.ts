// src/contracts/symbolicLifeFieldTypes.ts

export type LifeFieldId =
  | 'pressao_material'
  | 'casa_territorio'
  | 'trabalho_progresso'
  | 'rotina_vitalidade'
  | 'desejo_paixao'
  | 'tempo_idade'
  | 'identidade_valor'
  | 'dever_vs_desejo'
  | 'sintese_dominante';

export type LatentAxisId =
  | 'anxietyInsecurity'
  | 'autonomy'
  | 'sovereignty'
  | 'dignity'
  | 'comparison'
  | 'valueDependenceOnProgress'
  | 'potency'
  | 'impotence'
  | 'eroticVitality'
  | 'repressionOfDesire'
  | 'routineAsPrison'
  | 'urgency'
  | 'mourningForLostTime'
  | 'idealization'
  | 'lifeNotLived';

export interface SymbolicActivation {
  fieldId: LifeFieldId;
  latentAxes: LatentAxisId[];
  weight: number; // 0.0 to 1.0
  associatedCoreProblems: string[]; // which CoreProblemIds this field connects to
}

export interface SymbolicScanResult {
  activeFields: SymbolicActivation[];
  dominantField: LifeFieldId | null;
  dominantAxes: LatentAxisId[];
  // Mapping of how Core Problems from WideScan are reinforced
  coreProblemReinforcements: Record<string, number>; 
}
