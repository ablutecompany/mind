export interface DuplicationCheckInput {
  targetText: string;
  targetId?: string;
  targetSemanticCluster?: string;
  targetTemplateFamily?: string;
  context: {
    usedFingerprints: string[];
    usedSemanticClusters: string[];
    usedTemplateFamilies: string[];
    usedOpeningPatterns: string[];
  };
}

export interface DuplicationCheckResult {
  isDuplicate: boolean;
  overlapScore: number;
  reason?: string;
  matchedFingerprint?: string;
  matchedId?: string;
}

export interface TextFingerprintRecord {
  id: string; // The ID of the question, option, or sentence
  fingerprint: string;
  originalTextLength: number;
  type: 'question' | 'option' | 'sentence' | 'recognition' | 'opening';
  templateFamily?: string;
}

export interface CrossCaseValidationInput {
  sessionA: {
    id: string;
    dominantDomain: string | null;
    reportFingerprints: string[];
    openingFingerprint: string | null;
    recognitionFingerprints: string[];
    questionPathIds: string[];
  };
  sessionB: {
    id: string;
    dominantDomain: string | null;
    reportFingerprints: string[];
    openingFingerprint: string | null;
    recognitionFingerprints: string[];
    questionPathIds: string[];
  };
}

export interface CrossCaseValidationResult {
  reportSimilarityScore: number;
  insightOverlapScore: number;
  openingParagraphOverlap: number;
  recognitionLineOverlap: number;
  questionPathOverlap: number;
  failedCrossCase: boolean;
  failureReasons: string[];
}
