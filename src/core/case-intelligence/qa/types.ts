export interface InsightQualityScore {
  insightId: string;
  specificityScore: number;
  recognizabilityScore: number;
  domainAnchoringScore: number;
  evidenceSupportScore: number;
  contradictionTestScore: number;
  concretenessScore: number;
  abstractionScore: number;
  duplicationRiskScore: number;
  realityLinkScore: number;
  passedQA: boolean;
  rejectReasons: string[];
}

export interface ReportQualityScore {
  averageSpecificity: number;
  averageAnchoring: number;
  hasSufficientRealityAnchoring: boolean;
  passedQA: boolean;
  failureFlags: QAFailureFlag[];
}

export type QAFailureFlag = 
  | 'dominant_domain_not_stable'
  | 'report_too_generic'
  | 'recognition_lines_low_quality'
  | 'contradiction_not_tested'
  | 'cross_case_similarity_too_high'
  | 'insufficient_reality_anchoring';

export interface QARejection {
  rejectedId: string;
  type: 'insight' | 'recognition' | 'report_section';
  reasons: string[];
}
