import type { Drug, DrugSource } from '../types/drug';

/**
 * Normalize openFDA drug data to unified Drug schema
 */
export function mapOpenFDAToDrug(raw: any): Drug | null {
  try {
    if (!raw || !raw.openfda) return null;

    const openfda = raw.openfda;
    const id = openfda.product_ndc?.[0] || openfda.spl_set_id?.[0] || '';
    
    return {
      id,
      source: 'openFDA' as DrugSource,
      genericName: openfda.generic_name?.[0] || 'Unknown',
      brandNames: openfda.brand_name || [],
      indications: raw.indications_and_usage?.[0],
      dosage: raw.dosage_and_administration?.[0],
      warnings: raw.warnings?.[0],
      contraindications: raw.contraindications?.[0],
      interactions: raw.drug_interactions?.[0],
      lastUpdated: raw.effective_time?.[0],
      sourceUrl: `https://api.fda.gov/drug/label.json?search=product_ndc:"${id}"`,
    };
  } catch (error) {
    console.error('Error mapping openFDA data:', error);
    return null;
  }
}

/**
 * Normalize RxNorm drug data to unified Drug schema
 */
export function mapRxNormToDrug(raw: any): Drug | null {
  try {
    if (!raw || !raw.rxnormProperties) return null;

    const props = raw.rxnormProperties;
    const id = props.rxcui || '';
    
    return {
      id,
      source: 'RxNorm' as DrugSource,
      genericName: props.genericName || 'Unknown',
      brandNames: props.brandName ? [props.brandName] : [],
      lastUpdated: new Date().toISOString(),
      sourceUrl: `https://rxnav.nlm.nih.gov/REST/drugs/${id}`,
    };
  } catch (error) {
    console.error('Error mapping RxNorm data:', error);
    return null;
  }
}

/**
 * Normalize BPOM drug data to unified Drug schema
 */
export function mapBPOMToDrug(raw: any): Drug | null {
  try {
    if (!raw || !raw.registrationNumber) return null;

    return {
      id: raw.registrationNumber,
      source: 'BPOM' as DrugSource,
      genericName: raw.genericName || raw.productName || 'Unknown',
      brandNames: raw.productName ? [raw.productName] : [],
      registrationNumber: raw.registrationNumber,
      applicant: raw.applicant,
      manufacturer: raw.manufacturer,
      form: raw.form,
      strength: raw.strength,
      packaging: raw.packaging,
      status: raw.status,
      class: raw.class,
      category: raw.category,
      lastUpdated: raw.registrationDate || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error mapping BPOM data:', error);
    return null;
  }
}

/**
 * Merge multiple Drug objects into one (deduplication)
 */
export function mergeDrugs(drugs: Drug[]): Drug[] {
  const seen = new Map<string, Drug>();

  for (const drug of drugs) {
    const key = drug.genericName.toLowerCase();
    if (seen.has(key)) {
      // Merge: prefer the one with more data
      const existing = seen.get(key)!;
      if (
        (drug.indications && !existing.indications) ||
        (drug.dosage && !existing.dosage)
      ) {
        seen.set(key, drug);
      }
    } else {
      seen.set(key, drug);
    }
  }

  return Array.from(seen.values());
}

/**
 * Normalize search results from all sources
 */
export function normalizeSearchResults(
  openFdaResults: any[],
  rxNormResults: any[],
  bpomResults: any[]
): Drug[] {
  const drugs: Drug[] = [];

  // Map openFDA results
  for (const result of openFdaResults) {
    const drug = mapOpenFDAToDrug(result);
    if (drug) drugs.push(drug);
  }

  // Map RxNorm results
  for (const result of rxNormResults) {
    const drug = mapRxNormToDrug(result);
    if (drug) drugs.push(drug);
  }

  // Map BPOM results
  for (const result of bpomResults) {
    const drug = mapBPOMToDrug(result);
    if (drug) drugs.push(drug);
  }

  // Deduplicate
  return mergeDrugs(drugs);
}