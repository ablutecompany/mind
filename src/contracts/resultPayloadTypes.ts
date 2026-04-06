// src/contracts/resultPayloadTypes.ts

export const ENGINE_VERSION = '2.1.0';
export const SCHEMA_VERSION = '1.0.0';

export interface WowResultPayload {
  schemaVersion: string;
  engineVersion: string;
  manifestTheme: string;
  latentTheme: string;
  centralAxis: string;
  topTensions: string[];
  confidenceState: 'insufficient_to_close' | 'rival_open' | 'dominant_probable' | 'dominant_strong';
  rivalHypothesisOpen: string[] | null;
  unknowns: string[];
}

export interface DiscriminativeAnalysisPayload {
  schemaVersion: string;
  engineVersion: string;
  dominantProblem: string | null;
  supportingProblem: string | null;
  primaryDefense: string | null;
  centralConflict: string | null;
  likelyVisibleBehaviors: string[];
  riskIfNothingChanges: string;
}

export interface HistorySnapshotPayload {
  schemaVersion: string;
  timestamp: string; // ISO String
  dominantProblem: string | null;
  centralAxis: string | null;
  lifeFieldMostCharged: string | null;
  confidenceState: 'insufficient_to_close' | 'rival_open' | 'dominant_probable' | 'dominant_strong';
  changeVsPrevious: string | null; // e.g., 'shifted_from_anxiety', 'stable'
}
