// [integration_pending]
// [no_existing_ui_in_repo]
// [ready_for_future_hookup]

import { runCaseRealityPipeline } from '../engine';
import { RawInputAnswer } from '../engine/aggregateEvidence';

/**
 * Adapter interface to mimic legacy structures and hook them into V2.
 * 
 * Notice: This is provided as a stub to safely wire the former 'generateAnalysis' 
 * or 'buildInsightSummary' directly into the new engine without crashing existing UI.
 */
export class LegacyCompatibilityAdapter {
  
  /**
   * Translates the old generic answer structure into the new V2 reality pipeline.
   * Replaces old `generateAnalysis` calls in the UI.
   */
  static generateAnalysis(legacyAnswers: any[]) {
    // Basic mapping from legacy unstructured to V2 raw inputs.
    // NOTE: True mapping will depend on how legacy answers were shaped.
    const mappedAnswers: RawInputAnswer[] = legacyAnswers.map((ans, idx) => ({
      questionId: ans.id || `q_${idx}`,
      domainHint: ans.domain || 'autonomia_vs_pertenca', // fallback
      text: ans.text,
      signalType: 'support',
      strength: 0.5,
      polarity: 'supporting'
    }));

    const result = runCaseRealityPipeline(mappedAnswers);

    // Provide a mocked legacy-compatible output structure while returning the V2 context
    return {
      legacyStatus: 'replaced_by_v2',
      v2ReportContext: result.reportContext,
      v2RealityMap: result.caseRealityMap,
      v2Fingerprint: result.caseFingerprint,
      _debugTrace: result.debugTrace 
    };
  }

  /**
   * Replaces the former insight summary composer.
   */
  static buildInsightSummary(legacyAnswers: any[]) {
    // Currently redirects directly to the same V2 pipeline as everything must be unified
    return this.generateAnalysis(legacyAnswers);
  }
}
