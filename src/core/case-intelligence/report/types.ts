import { CaseRealityMap } from '../types';
import { CaseFingerprint } from '../types';
import { ReportContext } from '../engine/createReportContext';
import { ContradictionResult } from '../contradictions/types';

export interface ReportGenerationInput {
  caseRealityMap: CaseRealityMap;
  caseFingerprint: CaseFingerprint;
  reportContext: ReportContext;
  contradictionResults: ContradictionResult[];
}

export interface PublicReportSection {
  id: string; // e.g. "resumo_executivo", "domina_neste_momento"
  heading: string;
  paragraphs: string[];
}

export interface PublicReport {
  title: string;
  sections: PublicReportSection[];
  summaryFlags: {
    confidenceLevel: 'low' | 'medium' | 'high';
    dominantDomain: string | null;
    hasStrongRecognitionLines: boolean;
    hasUncertainty: boolean;
  };
}
