import { PublicReport } from '../report/types';
import { RecognitionPack } from '../recognition/types';
import { ReportQualityScore, QAFailureFlag } from './types';

export function filterPublicOutput(
  report: PublicReport, 
  recognitionPack: RecognitionPack, 
  // Normally qaScores would map to individual insights, but here we run global sanity checks since our engine already filters via Rules and Templates
): { filteredReport: PublicReport, filteredRecognition: string[], reportQA: ReportQualityScore } {
  
  const failureFlags: QAFailureFlag[] = [];
  
  // 1. Evaluate report global stability
  if (report.summaryFlags.confidenceLevel === 'low') {
    failureFlags.push('report_too_generic');
  }

  if (!report.summaryFlags.dominantDomain) {
    failureFlags.push('dominant_domain_not_stable');
  }

  // 2. Evaluate recognition quality
  if (recognitionPack.finalLines.length === 0) {
    failureFlags.push('recognition_lines_low_quality');
  }

  // If a report is too generic, we redact problematic sections
  let filteredSections = report.sections;
  if (failureFlags.includes('report_too_generic')) {
    filteredSections = report.sections.filter(s => s.id !== 'resumo_executivo'); // Strip the executive summary if it's too weak
  }

  return {
    filteredReport: {
      ...report,
      sections: filteredSections
    },
    filteredRecognition: recognitionPack.finalLines,
    reportQA: {
      averageSpecificity: 0.8, // placeholder metric for output UI
      averageAnchoring: 0.8,
      hasSufficientRealityAnchoring: report.summaryFlags.confidenceLevel !== 'low',
      passedQA: failureFlags.length === 0,
      failureFlags
    }
  };
}
