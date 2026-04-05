/**
 * Converts a text string into a structural fingerprint (sorted, lowercase, normalized tokens)
 * Specifically optimized for PT-PT heuristics without reliance on external NLP or embeddings.
 */
export function createTextFingerprint(text: string): string {
  if (!text) return "";

  // 1. Lowercase and remove accents
  let normalized = text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 2. Remove punctuation and special characters
  normalized = normalized.replace(/[^\w\s]/g, " ");

  // 3. Tokenize by space
  let tokens = normalized.split(/\s+/).filter(t => t.length > 2); // Dump words <= 2 chars (e, a, o, de, da)

  // 4. Remove PT stop words aggressively (simplistic heuristic)
  const stopWords = new Set([
    "que", "uma", "um", "nas", "nos", "pra", "para", "com", "sem", "por", 
    "dos", "das", "nao", "sim", "esta", "este", "isto", "aquilo", "isso", "aqui", "ali"
  ]);

  tokens = tokens.filter(t => !stopWords.has(t));

  // 5. Sort to remove structural differences from phrasing variations
  tokens.sort();

  return tokens.join("_");
}

/**
 * Calculates simple Jaccard similarity between two fingerprints.
 * Expects fingerprints produced by createTextFingerprint (underscore separated).
 */
export function calculateFingerprintSimilarity(fp1: string, fp2: string): number {
  if (!fp1 || !fp2) return 0;
  if (fp1 === fp2) return 1;

  const set1 = new Set(fp1.split("_"));
  const set2 = new Set(fp2.split("_"));
  
  if (set1.size === 0 && set2.size === 0) return 1;

  let intersection = 0;
  for (const token of set1) {
    if (set2.has(token)) intersection++;
  }

  const union = set1.size + set2.size - intersection;
  return intersection / union;
}
