import { InsightQualityScore } from './types';
import { QA_THRESHOLDS } from './thresholds';
import { ReportableInsight } from '../types';

export function scoreInsight(insight: ReportableInsight): InsightQualityScore {
  const score: InsightQualityScore = {
    insightId: insight.id,
    specificityScore: insight.specificityScore,
    recognizabilityScore: insight.recognizabilityScore,
    domainAnchoringScore: insight.domainAnchoringScore,
    evidenceSupportScore: insight.evidenceSupportScore,
    contradictionTestScore: insight.contradictionTestScore,
    concretenessScore: insight.realityLinkScore, // Mapping reality link to concreteness broadly
    abstractionScore: insight.abstractionScore,
    duplicationRiskScore: insight.duplicationRiskScore,
    realityLinkScore: insight.realityLinkScore,
    passedQA: true,
    rejectReasons: []
  };

  // Run checks against limits
  if (score.specificityScore < QA_THRESHOLDS.MIN_SPECIFICITY) {
    score.passedQA = false;
    score.rejectReasons.push(`Specificity too low (${score.specificityScore})`);
  }
  if (score.recognizabilityScore < QA_THRESHOLDS.MIN_RECOGNIZABILITY) {
    score.passedQA = false;
    score.rejectReasons.push(`Recognizability too low (${score.recognizabilityScore})`);
  }
  if (score.domainAnchoringScore < QA_THRESHOLDS.MIN_DOMAIN_ANCHORING) {
    score.passedQA = false;
    score.rejectReasons.push(`Poor domain anchoring (${score.domainAnchoringScore})`);
  }
  if (score.evidenceSupportScore < QA_THRESHOLDS.MIN_EVIDENCE_SUPPORT) {
    score.passedQA = false;
    score.rejectReasons.push(`Insufficient evidence support (${score.evidenceSupportScore})`);
  }
  if (score.concretenessScore < QA_THRESHOLDS.MIN_CONCRETENESS) {
    score.passedQA = false;
    score.rejectReasons.push(`Not concrete enough (${score.concretenessScore})`);
  }
  if (score.abstractionScore > QA_THRESHOLDS.MAX_ABSTRACTION) {
    score.passedQA = false;
    score.rejectReasons.push(`Too abstract/ornamental (${score.abstractionScore})`);
  }
  if (score.duplicationRiskScore > QA_THRESHOLDS.MAX_DUPLICATION_RISK) {
    score.passedQA = false;
    score.rejectReasons.push(`Duplication risk too high (${score.duplicationRiskScore})`);
  }

  // Text heuristics backup (in case the generated scores missed something obvious)
  const lowerBody = insight.body.toLowerCase();
  if (lowerBody.includes("o teu inconsciente") || lowerBody.includes("inconscientemente")) {
    score.passedQA = false;
    score.rejectReasons.push("Uses forbidden abstract 'unconscious' language");
  }

  return score;
}
