import { CaseRealityMap, CaseFingerprint, DomainKey, EvidenceSignal } from '../types';

export type PipelineStage = 
  | 'intake' 
  | 'evidence_aggregation' 
  | 'reality_mapping' 
  | 'fingerprinting' 
  | 'report_context_ready';

export interface DebugTraceEvent {
  ts: number;
  stage: string;
  action: string;
  payload: Record<string, unknown>;
}

export interface SessionCaseState {
  sessionId: string;
  rawAnswers: Record<string, any>[];
  evidenceLedger: EvidenceSignal[];
  activeDomains: DomainKey[];
  rejectedDomains: DomainKey[];
  caseRealityMap: CaseRealityMap | null;
  caseFingerprint: CaseFingerprint | null;
  debugTrace: DebugTraceEvent[];
  pipelineStage: PipelineStage;
}

export const createInitialSessionState = (sessionId: string): SessionCaseState => ({
  sessionId,
  rawAnswers: [],
  evidenceLedger: [],
  activeDomains: [],
  rejectedDomains: [],
  caseRealityMap: null,
  caseFingerprint: null,
  debugTrace: [],
  pipelineStage: 'intake'
});
