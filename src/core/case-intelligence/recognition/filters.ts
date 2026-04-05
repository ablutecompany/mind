import { RecognitionCandidate } from './types';

const THEATRICAL_BLACK_LIST = [
  "admito",
  "sempre soubeste",
  "escondes",
  "o teu inconsciente",
  "no fundo sabes",
  "nunca disseste em voz alta",
  "aquilo que ocultas é"
];

export function rejectFalseConfessionStyle(text: string): boolean {
  const lower = text.toLowerCase();
  return THEATRICAL_BLACK_LIST.some(blockedPhrase => lower.includes(blockedPhrase));
}

export function rejectOverAbstract(candidate: RecognitionCandidate): boolean {
  return candidate.abstractionScore > 0.6; // Higher score = too abstract/vague
}

export function rejectLowAnchoring(candidate: RecognitionCandidate): boolean {
  return candidate.domainAnchoringScore < 0.5 || candidate.evidenceSupportScore < 0.6;
}

export function rejectGenericRecognition(candidate: RecognitionCandidate): boolean {
  // If we couldn't properly anchor this to a real object or pain
  // (In a full implementation, you'd check `anchoredObjects` length)
  return candidate.duplicationRisk > 0.7; // Very generic lines have high duplication risk
}

export function evaluateCandidate(candidate: RecognitionCandidate): boolean {
  if (rejectFalseConfessionStyle(candidate.text)) return false;
  if (rejectOverAbstract(candidate)) return false;
  if (rejectLowAnchoring(candidate)) return false;
  if (rejectGenericRecognition(candidate)) return false;
  
  return true;
}
