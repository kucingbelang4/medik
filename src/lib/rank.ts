import type { Drug } from '../types/drug';

/**
 * Rank search results by relevance
 * Simple implementation - can be enhanced with TF-IDF, BM25, etc.
 */
export function rankSearchResults(
  drugs: Drug[],
  query: string
): Drug[] {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return drugs;

  // Score each drug
  const scored = drugs.map(drug => {
    let score = 0;

    // Exact match in generic name (highest score)
    if (drug.genericName.toLowerCase() === lowerQuery) {
      score += 100;
    }
    // Starts with query
    else if (drug.genericName.toLowerCase().startsWith(lowerQuery)) {
      score += 80;
    }
    // Contains query
    else if (drug.genericName.toLowerCase().includes(lowerQuery)) {
      score += 60;
    }

    // Brand name matches
    for (const brand of drug.brandNames) {
      const lowerBrand = brand.toLowerCase();
      if (lowerBrand === lowerQuery) {
        score += 90;
        break; // Don't double count
      }
      else if (lowerBrand.startsWith(lowerQuery)) {
        score += 70;
        break;
      }
      else if (lowerBrand.includes(lowerQuery)) {
        score += 50;
        break;
      }
    }

    // Prefer drugs with more complete information
    if (drug.indications) score += 10;
    if (drug.dosage) score += 10;
    if (drug.warnings) score += 5;

    return { drug, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.map(item => item.drug);
}

/**
 * Simple relevance scoring for API responses
 */
export function scoreRelevance(text: string, query: string): number {
  if (!text || !query) return 0;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 80;
  if (lowerText.includes(lowerQuery)) return 60;
  
  // Word boundary matches
  const words = lowerText.split(/\s+/);
  for (const word of words) {
    if (word === lowerQuery) return 90;
    if (word.startsWith(lowerQuery)) return 70;
  }
  
  return 0;
}