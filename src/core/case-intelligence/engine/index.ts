import { aggregateEvidence, RawInputAnswer } from './aggregateEvidence';
import { buildCaseRealityMap } from './buildCaseRealityMap';
import { buildCaseFingerprint } from './buildCaseFingerprint';
import { createReportContext, ReportContext } from './createReportContext';
import { CaseRealityMap, CaseFingerprint, EvidenceSignal } from '../types';
import { DebugTraceEvent } from '../state/sessionCaseState';

export interface PipelineOutput {
  evidenceLedger: EvidenceSignal[];
  caseRealityMap: CaseRealityMap;
  caseFingerprint: CaseFingerprint | null;
  reportContext: ReportContext;
  debugTrace: DebugTraceEvent[];
}

export function runCaseRealityPipeline(rawAnswers: RawInputAnswer[]): PipelineOutput {
  const debugTrace: DebugTraceEvent[] = [];

  const logTrace = (stage: string, action: string, payload: any) => {
    debugTrace.push({ ts: Date.now(), stage, action, payload });
  };

  logTrace('intake', 'received_answers', { count: rawAnswers.length });

  // 1. Evidence Aggregation
  const evidenceLedger = aggregateEvidence(rawAnswers);
  logTrace('evidence_aggregation', 'ledger_built', { signalsCount: evidenceLedger.length });

  // 2. Reality Mapping
  const caseRealityMap = buildCaseRealityMap(evidenceLedger);
  logTrace('reality_mapping', 'map_built', { dominantDomain: caseRealityMap.dominantDomain });

  // 3. Fingerprinting
  const caseFingerprint = buildCaseFingerprint(caseRealityMap, evidenceLedger);
  // Re-link the fingerprint locally back to the map if it exists
  caseRealityMap.caseFingerprint = caseFingerprint; 
  logTrace('fingerprinting', 'fingerprint_built', { present: !!caseFingerprint });

  // 4. Report Context Generation
  const reportContext = createReportContext(caseRealityMap, evidenceLedger);
  logTrace('report_context_ready', 'context_built', { validatedFacts: reportContext.validatedFacts.length });

  return {
    evidenceLedger,
    caseRealityMap,
    caseFingerprint,
    reportContext,
    debugTrace
  };
}
