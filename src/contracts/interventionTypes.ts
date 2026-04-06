// src/contracts/interventionTypes.ts

export const INTERVENTION_SCHEMA_VERSION = '1.0.0';

export interface InterventionPreviewPayload {
  schemaVersion: string;
  previewReading: string;
  previewPriority: string;
  previewAction: string;
  optionalSecondSuggestion?: string;
  hasMoreLocked: boolean;
}

export interface FullInterventionPayload {
  schemaVersion: string;
  operationalReading: string;
  problemsToSeparate: string[];
  interventionFronts: string[];
  immediateActions: string[];
  mediumTermReorganization: string[];
  likelyErrors: string[];
  priorities: string[];
  finalSynthesisLine: string;
}
