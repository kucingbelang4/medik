/**
 * openFDA API Client
 * Base URL: https://api.fda.gov/drug/label.json
 * Auth: None (free, ~1000 req/day)
 */

const BASE_URL = 'https://api.fda.gov/drug/label.json';
const API_KEY = process.env.OPENFDA_API_KEY;

export interface OpenFDADrug {
  openfda: {
    product_ndc?: string[];
    generic_name?: string[];
    brand_name?: string[];
    spl_set_id?: string[];
  };
  indications_and_usage?: string[];
  dosage_and_administration?: string[];
  warnings?: string[];
  contraindications?: string[];
  drug_interactions?: string[];
  effective_time?: string[];
}

/**
 * Search by indication/symptom
 * e.g., searchByIndication('headache')
 */
export async function searchByIndication(query: string): Promise<OpenFDADrug[]> {
  const url = `${BASE_URL}?search=indications_and_usage:"${encodeURIComponent(query)}"&limit=50${API_KEY ? `&api_key=${API_KEY}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`openFDA API error: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('openFDA searchByIndication error:', error);
    return [];
  }
}

/**
 * Search by generic name
 * e.g., searchByGenericName('acetaminophen')
 */
export async function searchByGenericName(name: string): Promise<OpenFDADrug[]> {
  const url = `${BASE_URL}?search=openfda.generic_name:"${encodeURIComponent(name)}"&limit=50${API_KEY ? `&api_key=${API_KEY}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`openFDA API error: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('openFDA searchByGenericName error:', error);
    return [];
  }
}

/**
 * Search by brand name
 * e.g., searchByBrandName('panadol')
 */
export async function searchByBrandName(name: string): Promise<OpenFDADrug[]> {
  const url = `${BASE_URL}?search=openfda.brand_name:"${encodeURIComponent(name)}"&limit=50${API_KEY ? `&api_key=${API_KEY}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`openFDA API error: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('openFDA searchByBrandName error:', error);
    return [];
  }
}