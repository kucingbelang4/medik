/**
 * BPOM API/Dataset Client
 * Status: Investigation needed (official API or manual dataset)
 * For now, we'll create a placeholder that loads from a local dataset
 * In production, this could be replaced with actual BPOM API calls
 */

export type DrugSource = 'openFDA' | 'RxNorm' | 'BPOM';

export interface Drug {
  id: string;
  source: DrugSource;
  genericName: string;
  brandNames: string[];
  indications?: string;
  dosage?: string;
  warnings?: string;
  contraindications?: string;
  interactions?: string;
  registrationNumber?: string;
  applicant?: string;
  manufacturer?: string;
  form?: string;
  strength?: string;
  packaging?: string;
  status?: string;
  class?: string;
  category?: string;
  lastUpdated?: string;
  sourceUrl?: string;
}

interface BPOMRaw {
  nie_number?: string;
  nama_generik?: string;
  nama_merek?: string;
  pemegang_izin?: string;
  pabrik?: string;
  bentuk_sediaan?: string;
  kekutan?: string;
  kemasan?: string;
  status?: string;
  kelas_obat?: string;
  golongan?: string;
  tanggal_daftar?: string;
}

/**
 * Load BPOM dataset from local JSON file
 */
export async function loadBPOMDataset(): Promise<Drug[]> {
  try {
    const response = await fetch('/dataset/bpom-drugs.json');
    if (!response.ok) {
      console.warn('BPOM dataset not found, returning empty array');
      return [];
    }
    const data: BPOMRaw[] = await response.json();
    
    return data.map((item) => ({
      id: item.nie_number || '',
      source: 'BPOM' as DrugSource,
      genericName: item.nama_generik || '',
      brandNames: item.nama_merek ? [item.nama_merek] : [],
      registrationNumber: item.nie_number,
      applicant: item.pemegang_izin,
      manufacturer: item.pabrik,
      form: item.bentuk_sediaan,
      strength: item.kekutan,
      packaging: item.kemasan,
      status: item.status,
      class: item.kelas_obat,
      category: item.golongan,
      lastUpdated: item.tanggal_daftar || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error loading BPOM dataset:', error);
    return [];
  }
}

/**
 * Search BPOM dataset by query
 */
export async function searchBPOM(query: string): Promise<Drug[]> {
  try {
    const dataset = await loadBPOMDataset();
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return [];

    return dataset.filter(drug => 
      drug.genericName.toLowerCase().includes(lowerQuery) ||
      drug.brandNames.some(brand => brand.toLowerCase().includes(lowerQuery)) ||
      (drug.registrationNumber && drug.registrationNumber.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error('Error searching BPOM dataset:', error);
    return [];
  }
}