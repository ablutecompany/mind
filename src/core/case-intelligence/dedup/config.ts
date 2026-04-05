export const DEDUP_CONFIG = {
  // Allowances inside the same session
  SAME_SESSION_SENTENCE_SIMILARITY_MAX: 0.75, // Jaccard threshold that triggers block

  // Cross case analysis (preventing boilerplate / horoscoping)
  CROSS_CASE_REPORT_OVERLAP_MAX: 0.60,
  CROSS_CASE_OPENING_OVERLAP_MAX: 0.50, // Openings should be strongly unique if domains differ
  CROSS_CASE_RECOGNITION_OVERLAP_MAX: 0.40, // Recognition lines shouldn't be identically spammed across cases
  CROSS_CASE_PATH_OVERLAP_MAX: 0.70 // Identical question path indicates bad branching
};
