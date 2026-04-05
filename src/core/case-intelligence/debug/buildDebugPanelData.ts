import { SessionCaseState } from '../state/sessionCaseState';
import { PublicReport } from '../report/types';
import { ReportQualityScore, QARejection } from '../qa/types';
import { RecognitionPack } from '../recognition/types';

export interface InternalDebugPanel {
  enableAdaptiveInterviewDebug: boolean;
  
  // Pipeline Stats
  pipelineStage: string;
  totalLedgerEvents: number;
  
  // Domains
  activeDomains: string[];
  rejectedDomains: string[];
  dominantDomain: string | null;
  dominantProblem: string | null;
  dominantConstraint: string | null;
  dominantDesire: string | null;

  // QA and Dedup
  confidenceLevel: string;
  uncertaintyFlags: string[];
  contradictorsFired: number;
  reportQAState: ReportQualityScore;
  rejections: QARejection[];
  
  // Omissions
  omittedReportSections: string[];
  
  // Trace Data
  rawSupportingEvidenceCount: number;
}

export function buildDebugPanelData(
  state: SessionCaseState, 
  report: PublicReport | null,
  recognitionPack: RecognitionPack | null,
  qaScore: ReportQualityScore | null,
  rejections: QARejection[] = []
): InternalDebugPanel {
  
  // Find omitted sections if report exists
  const standardSections = [
    'resumo_executivo', 'domina_neste_momento', 'o_que_prende', 
    'o_que_doi_mais', 'o_que_esta_adiado', 'validado', 'menos_seguro'
  ];
  const presentSections = report ? report.sections.map(s => s.id) : [];
  const omitted = report ? standardSections.filter(s => !presentSections.includes(s)) : [];

  return {
    enableAdaptiveInterviewDebug: true, // Only true in dev environments
    
    pipelineStage: state.pipelineStage,
    totalLedgerEvents: state.evidenceLedger.length,
    
    activeDomains: state.activeDomains,
    rejectedDomains: state.rejectedDomains,
    dominantDomain: state.caseRealityMap?.dominantDomain || null,
    dominantProblem: state.caseRealityMap?.dominantProblem || null,
    dominantConstraint: state.caseRealityMap?.dominantConstraint || null,
    dominantDesire: state.caseRealityMap?.dominantDesire || null,

    confidenceLevel: state.caseRealityMap?.confidenceLevel || 'low',
    uncertaintyFlags: state.caseRealityMap?.uncertaintyFlags || [],
    contradictorsFired: 0, // Mocked for payload, derived from question engine in real app
    
    reportQAState: qaScore || {
      averageSpecificity: 0, averageAnchoring: 0, 
      hasSufficientRealityAnchoring: false, passedQA: false, failureFlags: []
    },
    
    rejections: rejections,
    omittedReportSections: omitted,
    rawSupportingEvidenceCount: state.caseRealityMap?.supportingEvidence.length || 0
  };
}
