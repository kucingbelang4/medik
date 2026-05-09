/**
 * Medik - Indonesian Drug Information Database
 *
 * DISCLAIMER: This information is for educational purposes only.
 * It is NOT medical advice. Always consult a doctor or pharmacist
 * before taking any medication. In emergency, contact your local
 * emergency services.
 */

// Re-export for easy import
export const DISCLAIMER =
  "DISCLAIMER: This information is for educational purposes only. " +
  "It is NOT medical advice. Always consult a doctor or pharmacist " +
  "before taking any medication. In emergency, contact your local emergency services."

// Source types
export type DrugSource = 'openFDA' | 'RxNorm' | 'BPOM';

// Unified Drug schema (normalized from all sources)
export interface Drug {
  // Identifier
  id: string; // sourceId (NDC, RxCUI, or NIE number)
  source: DrugSource;

  // Names
  genericName: string;
  brandNames: string[];

  // Clinical info
  indications?: string; // openFDA: indications_and_usage
  dosage?: string; // openFDA: dosage_and_administration
  warnings?: string; // openFDA: warnings
  contraindications?: string; // openFDA: contraindications
  interactions?: string; // openFDA: drug_interactions

  // Indonesian specific (BPOM)
  registrationNumber?: string; // BPOM NIE number
  applicant?: string;
  manufacturer?: string;
  form?: string; // tablet, capsule, syrup, etc.
  strength?: string; // 500mg, 100mg/5ml, etc.
  packaging?: string;
  status?: string; // Active, Withdrawn, etc.
  class?: string; // Obat Bebas, Obat Keras, etc.
  category?: string;

  // Metadata
  lastUpdated?: string;
  sourceUrl?: string; // API response URL for attribution
}

// Search result
export interface SearchResult {
  drugs: Drug[];
  total: number;
  query: string;
  disclaimer: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Cache key prefixes
export const CACHE_KEYS = {
  SEARCH: 'search:',
  DRUG: 'drug:',
  BRAND_MAPPING: 'mapping:brand:',
  GENERIC_MAPPING: 'mapping:generic:',
  BPOM_ALL: 'bpom:all',
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SEARCH: 86400, // 24 hours
  DRUG: 86400, // 24 hours
  MAPPING: 604800, // 7 days
  BPOM: 21600, // 6 hours
} as const;