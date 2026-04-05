import { DuplicationCheckInput, DuplicationCheckResult } from './types';
import { calculateFingerprintSimilarity, createTextFingerprint } from './textFingerprint';
import { DEDUP_CONFIG } from './config';

export function checkQuestionDuplication(input: DuplicationCheckInput): DuplicationCheckResult {
  
  if (input.targetSemanticCluster && input.context.usedSemanticClusters.includes(input.targetSemanticCluster)) {
    return {
      isDuplicate: true,
      overlapScore: 1.0,
      reason: 'Semantic cluster collision: Question covers the exact same granular topic as a previously asked question.',
      matchedFingerprint: input.targetSemanticCluster
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
      reason: 'Prompt phrasing similarity is too high. Sounds identical to a previous question.',
      matchedFingerprint: collisionPrint
    };
  }

  return {
    isDuplicate: false,
    overlapScore: maxSimilarity
  };
}
