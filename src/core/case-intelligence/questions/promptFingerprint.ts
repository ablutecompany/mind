import { QuestionOption } from './types';

export function normalizeText(text: string): string {
  // Lowercase and remove excessive spaces
  let str = text.toLowerCase().trim();
  // Remove punctuation
  str = str.replace(/[.,/#!$%^&*;:{}=\-_`~()?“”"']/g, '');
  str = str.replace(/\s{2,}/g, ' ');
  return str;
}

export function tokenizeNormalized(text: string): string[] {
  return text.split(' ').filter(Boolean);
}

const STOPWORDS_PT = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das',
  'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'que', 'e', 'ou', 'mas',
  'se', 'como', 'isto', 'isso', 'aquilo', 'este', 'esta', 'esse', 'essa'
]);

export function removeStopwordsPt(text: string): string {
  const tokens = tokenizeNormalized(text);
  return tokens.filter(t => !STOPWORDS_PT.has(t)).join(' ');
}

export function simpleStemPt(token: string): string {
  // Very simplistic stemmer rules for heuristic matching
  let s = token;
  if (s.endsWith('ões')) return s.slice(0, -3) + 'ao';
  if (s.endsWith('mente')) return s.slice(0, -5);
  if (s.endsWith('ando') || s.endsWith('endo') || s.endsWith('indo')) return s.slice(0, -4);
  if (s.endsWith('mos')) return s.slice(0, -3);
  if (s.length > 5 && s.endsWith('os')) return s.slice(0, -2);
  if (s.length > 4 && s.endsWith('s')) return s.slice(0, -1);
  return s;
}

export function buildPromptFingerprint(text: string): string {
  const normalized = normalizeText(text);
  const withoutStops = removeStopwordsPt(normalized);
  const stemmed = tokenizeNormalized(withoutStops).map(simpleStemPt);
  return stemmed.join('_');
}

export function buildOptionSetFingerprint(options?: QuestionOption[]): string {
  if (!options || options.length === 0) return 'empty_options';
  
  // Sort and hash conceptually
  const optionFingerprints = options
    .map(opt => buildPromptFingerprint(opt.label))
    .sort(); // Sort to ignore ordering differences
  
  return optionFingerprints.join('|||');
}
