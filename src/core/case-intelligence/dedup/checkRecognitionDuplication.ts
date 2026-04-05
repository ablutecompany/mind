import { DuplicationCheckInput, DuplicationCheckResult } from './types';
import { calculateFingerprintSimilarity, createTextFingerprint } from './textFingerprint';
import { DEDUP_CONFIG } from './config';

export function checkRecognitionDuplication(input: DuplicationCheckInput): DuplicationCheckResult {
  
  if (input.targetTemplateFamily && input.context.usedTemplateFamilies.includes(input.targetTemplateFamily)) {
    return {
      isDuplicate: true,
      overlapScore: 1.0,
      reason: 'Template family collision: We already generated a recognition line using this structural framework.'
    };
  }

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

  if (maxSimilarity > DEDUP_CONFIG.SAME_SESSION_SENTENCE_SIMILARITY_MAX) {
    return {
      isDuplicate: true,
      overlapScore: maxSimilarity,
      reason: 'Recognition line is lexically identical to a previously accepted line.',
      matchedFingerprint: collisionPrint
    };
  }

  return {
    isDuplicate: false,
    overlapScore: maxSimilarity
  };
}
