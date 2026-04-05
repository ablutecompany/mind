import { CrossCaseValidationInput, CrossCaseValidationResult } from './types';
import { calculateFingerprintSimilarity } from './textFingerprint';
import { DEDUP_CONFIG } from './config';

function calculateArrayJaccard(arr1: string[], arr2: string[]): number {
  if (!arr1.length && !arr2.length) return 0;
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  let intersection = 0;
  for (const item of set1) {
    if (set2.has(item)) intersection++;
  }
  const union = set1.size + set2.size - intersection;
  return intersection / union;
}

export function validateCrossCaseIntegrity(input: CrossCaseValidationInput): CrossCaseValidationResult {
  const isDifferentDomain = input.sessionA.dominantDomain !== input.sessionB.dominantDomain;

  // 1. Report Overlap
  const reportSimilarityScore = calculateArrayJaccard(
    input.sessionA.reportFingerprints, 
    input.sessionB.reportFingerprints
  );

  // 2. Opening Paragraph Overlap
  const openingParagraphOverlap = calculateFingerprintSimilarity(
    input.sessionA.openingFingerprint || '',
    input.sessionB.openingFingerprint || ''
  );

  // 3. Recognition Overlap
  const recognitionLineOverlap = calculateArrayJaccard(
    input.sessionA.recognitionFingerprints,
    input.sessionB.recognitionFingerprints
  );

  // 4. Question Path Overlap
  const questionPathOverlap = calculateArrayJaccard(
    input.sessionA.questionPathIds,
    input.sessionB.questionPathIds
  );

  const failureReasons: string[] = [];

  if (isDifferentDomain) {
    // If cases have completely different dominant domains...
    
    if (openingParagraphOverlap > DEDUP_CONFIG.CROSS_CASE_OPENING_OVERLAP_MAX) {
      failureReasons.push(`Opening paragraph overlap (${openingParagraphOverlap.toFixed(2)}) is unacceptably high for disparate cases.`);
    }

    if (recognitionLineOverlap > DEDUP_CONFIG.CROSS_CASE_RECOGNITION_OVERLAP_MAX) {
      failureReasons.push(`Recognition line overlap (${recognitionLineOverlap.toFixed(2)}) implies horoscoping across disparate cases.`);
    }

    if (reportSimilarityScore > DEDUP_CONFIG.CROSS_CASE_REPORT_OVERLAP_MAX) {
      failureReasons.push(`Overall report overlap (${reportSimilarityScore.toFixed(2)}) exceeds maximum for disparate cases.`);
    }
  }

  // Paths shouldn't be identical regardless
  if (questionPathOverlap > DEDUP_CONFIG.CROSS_CASE_PATH_OVERLAP_MAX) {
    failureReasons.push(`Question branching is too linear. Overlap (${questionPathOverlap.toFixed(2)}) exceeds maximum.`);
  }

  // Define general insight overlap loosely as the max of report or recognition
  const insightOverlapScore = Math.max(reportSimilarityScore, recognitionLineOverlap);

  return {
    reportSimilarityScore,
    insightOverlapScore,
    openingParagraphOverlap,
    recognitionLineOverlap,
    questionPathOverlap,
    failedCrossCase: failureReasons.length > 0,
    failureReasons
  };
}
