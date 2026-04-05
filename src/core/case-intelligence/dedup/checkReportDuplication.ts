import { DuplicationCheckInput, DuplicationCheckResult } from './types';
import { calculateFingerprintSimilarity, createTextFingerprint } from './textFingerprint';
import { DEDUP_CONFIG } from './config';

export function checkReportSentenceDuplication(input: DuplicationCheckInput): DuplicationCheckResult {
  const newFingerprint = createTextFingerprint(input.targetText);
  let maxSimilarity = 0;
  let collisionPrint = "";

  for (const usedPrint of input.context.usedFingerprints) {
    const sim = calculateFingerprintSimilarity(newFingerprint, usedPrint);
    if (sim > maxSimilarity) {
      maxSimilarity = sim;
      collisionPrint = usedPrint;
    }
  }

  // Same session limit for report sentences is tight, a report shouldn't repeat itself
  if (maxSimilarity > DEDUP_CONFIG.SAME_SESSION_SENTENCE_SIMILARITY_MAX) {
    return {
      isDuplicate: true,
      overlapScore: maxSimilarity,
      reason: 'Report paragraph is too structurally similar to an already generated paragraph in the same session.',
      matchedFingerprint: collisionPrint
    };
  }

  return {
    isDuplicate: false,
    overlapScore: maxSimilarity
  };
}
