import { QuestionNode, QuestionOption } from './types';
import { 
  buildPromptFingerprint, 
  buildOptionSetFingerprint, 
  tokenizeNormalized, 
  removeStopwordsPt, 
  simpleStemPt 
} from './promptFingerprint';
import { PROMPT_SIMILARITY_HIGH, OPTION_SET_SIMILARITY_HIGH } from './config';

export function tokenJaccardScore(a: string, b: string): number {
  const setA = new Set(tokenizeNormalized(removeStopwordsPt(a)).map(simpleStemPt));
  const setB = new Set(tokenizeNormalized(removeStopwordsPt(b)).map(simpleStemPt));
  
  if (setA.size === 0 && setB.size === 0) return 1.0;
  
  const intersection = new Set([...setA].filter(i => setB.has(i)));
  const union = new Set([...setA, ...setB]);
  
  return intersection.size / union.size;
}

export function lexicalOverlapScore(a: string, b: string): number {
  return tokenJaccardScore(a, b);
}

export function ngramOverlapScore(a: string, b: string): number {
  // Simplified ngram implementation using token pairs
  const getBigrams = (text: string) => {
    const tokens = tokenizeNormalized(removeStopwordsPt(text)).map(simpleStemPt);
    const bigrams = new Set<string>();
    for (let i = 0; i < tokens.length - 1; i++) {
      bigrams.add(`${tokens[i]}_${tokens[i+1]}`);
    }
    return bigrams;
  };

  const setA = getBigrams(a);
  const setB = getBigrams(b);
  
  if (setA.size === 0 || setB.size === 0) return 0.0;
  
  const intersection = new Set([...setA].filter(i => setB.has(i)));
  const union = new Set([...setA, ...setB]);
  
  return intersection.size / union.size;
}

export function areTooSimilarPrompts(promptA: string, promptB: string, functionTypeSame: boolean): boolean {
  if (buildPromptFingerprint(promptA) === buildPromptFingerprint(promptB)) return true;
  
  const jaccard = tokenJaccardScore(promptA, promptB);
  const strictThreshold = functionTypeSame ? PROMPT_SIMILARITY_HIGH : PROMPT_SIMILARITY_HIGH + 0.1;
  
  return jaccard >= strictThreshold;
}

export function areTooSimilarOptionSets(optsA?: QuestionOption[], optsB?: QuestionOption[]): boolean {
  if (!optsA || !optsB) return false;
  if (optsA.length === 0 && optsB.length === 0) return true;
  
  if (buildOptionSetFingerprint(optsA) === buildOptionSetFingerprint(optsB)) return true;
  
  // Calculate aggregate jaccard between options
  const joinedA = optsA.map(o => o.label).join(' ');
  const joinedB = optsB.map(o => o.label).join(' ');
  
  return tokenJaccardScore(joinedA, joinedB) >= OPTION_SET_SIMILARITY_HIGH;
}
