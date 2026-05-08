import type { Drug } from '../types/drug';
import { 
  searchByIndication, 
  searchByGenericName, 
  searchByBrandName 
} from './api/openfda';
import { 
  brandToGeneric, 
  getSpellingSuggestions 
} from './api/rxnorm';
import { searchBPOM } from './api/bpom';
import { mapOpenFDAToDrug, mergeDrugs } from './normalize';
import { rankSearchResults } from './rank';
import { 
  getCachedSearch, 
  setCachedSearch,
  getCachedDrug,
  setCachedDrug
} from './cache';

interface SearchResult {
  status: 'fulfilled' | 'rejected';
  source: string;
  value?: Drug[];
  reason?: unknown;
}

/**
 * Main search function - queries all sources with graceful degradation
 * Uses Redis cache for performance
 */
export async function searchDrugs(query: string): Promise<{ drugs: Drug[]; errors: string[] }> {
  const errors: string[] = [];
  
  if (!query.trim()) {
    return { drugs: [], errors };
  }

  // Check cache first
  const cached = await getCachedSearch(query);
  if (cached) {
    console.log(`Cache hit for query: ${query}`);
    return { drugs: cached, errors: [] };
  }

  // Step 1: Get brand/generic mapping from RxNorm
  let genericName = query;
  let brandNames: string[] = [];
  
  try {
    const mapping = await brandToGeneric(query);
    if (mapping.genericName && mapping.genericName.toLowerCase() !== query.toLowerCase()) {
      genericName = mapping.genericName;
      brandNames = mapping.brandNames;
    } else if (mapping.brandNames.length > 0) {
      brandNames = mapping.brandNames;
    }
  } catch (error) {
    console.warn('RxNorm mapping failed:', error);
  }

  // Step 2: Parallel fetch from all sources with Promise.allSettled
  const settle = <T>(promise: Promise<T>, source: string): Promise<SearchResult> =>
    promise
      .then((value): Promise<SearchResult> => Promise.resolve({ status: 'fulfilled', source, value: value as unknown as Drug[] }))
      .catch((reason): Promise<SearchResult> => {
        errors.push(`${source} failed: ${reason}`);
        return Promise.resolve({ status: 'rejected', source, reason });
      });

  const results = await Promise.all([
    settle(searchByIndication(query), 'openFDA-indication'),
    settle(searchByGenericName(genericName), 'openFDA-generic'),
    settle(searchByBrandName(query), 'openFDA-brand'),
    settle(searchBPOM(query), 'BPOM'),
  ]);

  // Step 3: Collect and normalize results
  const allDrugs: Drug[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      if (result.source.startsWith('openFDA')) {
        // Map openFDA results
        for (const item of result.value) {
          const drug = mapOpenFDAToDrug(item);
          if (drug) allDrugs.push(drug);
        }
      } else if (result.source === 'BPOM') {
        // BPOM results already normalized
        allDrugs.push(...result.value);
      }
    }
  }

  // Step 4: Merge and rank
  const merged = mergeDrugs(allDrugs);
  const ranked = rankSearchResults(merged, query);

  // Cache the results
  await setCachedSearch(query, ranked);

  return { drugs: ranked, errors };
}

/**
 * Get drug by ID - with caching
 */
export async function getDrugById(id: string): Promise<Drug | null> {
  // Check cache first
  const cached = await getCachedDrug(id);
  if (cached) {
    console.log(`Cache hit for drug: ${id}`);
    return cached;
  }

  let drug: Drug | null = null;

  // Try openFDA first (by NDC)
  try {
    const response = await fetch(
      `https://api.fda.gov/drug/label.json?search=product_ndc:"${encodeURIComponent(id)}"&limit=1`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        drug = mapOpenFDAToDrug(data.results[0]);
      }
    }
  } catch (error) {
    console.warn('openFDA lookup failed:', error);
  }

  // Try BPOM
  if (!drug) {
    try {
      const bpomResults = await searchBPOM(id);
      drug = bpomResults.find(d => d.id === id) || null;
    } catch (error) {
      console.warn('BPOM lookup failed:', error);
    }
  }

  // Cache if found
  if (drug) {
    await setCachedDrug(id, drug);
  }

  return drug;
}

/**
 * Get spelling suggestions for typos
 */
export async function getSuggestions(query: string): Promise<string[]> {
  try {
    return await getSpellingSuggestions(query);
  } catch (error) {
    console.warn('Spelling suggestions failed:', error);
    return [];
  }
}