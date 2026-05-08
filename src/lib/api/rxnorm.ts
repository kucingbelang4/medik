/**
 * RxNorm API Client
 * Base URL: https://rxnav.nlm.nih.gov/REST/
 * Auth: None (NIH free API)
 */

const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

export interface RxNormDrug {
  rxnormProperties?: {
    rxcui?: string;
    genericName?: string;
    brandName?: string;
  };
}

/**
 * Get brand name from brand search -> returns generic name
 * GET /drugs.json?name=Panadol
 */
export async function brandToGeneric(brandName: string): Promise<{ genericName: string; brandNames: string[] }> {
  const url = `${BASE_URL}/drugs.json?name=${encodeURIComponent(brandName)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`RxNorm API error: ${response.status} ${response.statusText}`);
      return { genericName: brandName, brandNames: [brandName] };
    }

    const data = await response.json();
    const drugGroup = data.drugGroup;

    if (!drugGroup || !drugGroup.conceptGroup) {
      return { genericName: brandName, brandNames: [brandName] };
    }

    // Extract generic name and brand names
    let genericName = brandName;
    const brandNames: string[] = [];

    for (const group of drugGroup.conceptGroup) {
      if (group.tty === 'BN' && group.conceptProperties) {
        // Brand names
        for (const prop of group.conceptProperties) {
          brandNames.push(prop.name);
        }
      }
      if (group.tty === 'SBD' && group.conceptProperties) {
        // Branded drugs with generic info
        for (const prop of group.conceptProperties) {
          if (prop.name) brandNames.push(prop.name);
        }
      }
    }

    // If we have brand names but no generic, use the first brand as fallback
    if (brandNames.length > 0 && genericName === brandName) {
      genericName = brandNames[0]; // This is a simplification
    }

    return { genericName, brandNames: brandNames.length > 0 ? brandNames : [brandName] };
  } catch (error) {
    console.error('RxNorm brandToGeneric error:', error);
    return { genericName: brandName, brandNames: [brandName] };
  }
}

/**
 * Get brand names from generic search
 * GET /drugs.json?name=acetaminophen
 */
export async function genericToBrands(genericName: string): Promise<string[]> {
  const url = `${BASE_URL}/drugs.json?name=${encodeURIComponent(genericName)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`RxNorm API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    const drugGroup = data.drugGroup;

    if (!drugGroup || !drugGroup.conceptGroup) {
      return [];
    }

    const brandNames: string[] = [];
    for (const group of drugGroup.conceptGroup) {
      if (group.conceptProperties) {
        for (const prop of group.conceptProperties) {
          if (prop.name) brandNames.push(prop.name);
        }
      }
    }

    return brandNames;
  } catch (error) {
    console.error('RxNorm genericToBrands error:', error);
    return [];
  }
}

/**
 * Get spelling suggestions for typos
 * GET /spellingsuggestions.json?name=typo
 */
export async function getSpellingSuggestions(query: string): Promise<string[]> {
  const url = `${BASE_URL}/spellingsuggestions.json?name=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!data.suggestionGroup || !data.suggestionGroup.suggestionList) {
      return [];
    }

    return data.suggestionGroup.suggestionList.map((s: any) => s.suggestion);
  } catch (error) {
    console.error('RxNorm getSpellingSuggestions error:', error);
    return [];
  }
}