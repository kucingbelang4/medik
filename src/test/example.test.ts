import { describe, expect, it } from 'vitest'
import { DISCLAIMER, type Drug, type SearchResult } from '@/types/drug'

describe('Medik Core Types', () => {
  it('should have valid disclaimer text', () => {
    expect(DISCLAIMER).toContain('educational purposes only')
    expect(DISCLAIMER).toContain('NOT medical advice')
    expect(DISCLAIMER).toContain('consult a doctor or pharmacist')
  })

  it('should create valid Drug object', () => {
    const drug: Drug = {
      id: 'NDC-12345-6789',
      source: 'openFDA',
      genericName: 'Acetaminophen',
      brandNames: ['Tylenol', 'Panadol', 'Calpol'],
      indications: 'For temporary relief of minor aches and pains due to headache, toothache, etc.',
      dosage: 'Adults and children 12 years and over: take 2 tablets every 4-6 hours',
      warnings: 'Do not take more than 10 tablets in 24 hours.',
      contraindications: 'Do not use if you are allergic to acetaminophen.',
      interactions: 'May interact with blood thinners like warfarin.',
      lastUpdated: '2024-01-15',
    }

    expect(drug.id).toBe('NDC-12345-6789')
    expect(drug.source).toBe('openFDA')
    expect(drug.genericName).toBe('Acetaminophen')
    expect(drug.brandNames).toContain('Tylenol')
  })

  it('should create valid BPOM Drug object', () => {
    const drug: Drug = {
      id: 'DKI12345678901',
      source: 'BPOM',
      genericName: 'Paracetamol',
      brandNames: ['Sanmol', 'Bodrex', 'Oskadon'],
      registrationNumber: 'DKI12345678901',
      applicant: 'PT Sanbe Farma',
      manufacturer: 'PT Sanbe Farma',
      form: 'TABLET',
      strength: '500 MG',
      packaging: '10 TABLET',
      status: 'BERLAKU',
      class: 'OBAT BEBAS TERBATAS',
      category: 'ANALGESIK - ANTIPIRETIK',
      lastUpdated: '2024-01-01',
    }

    expect(drug.id).toBe('DKI12345678901')
    expect(drug.source).toBe('BPOM')
    expect(drug.registrationNumber).toBe('DKI12345678901')
    expect(drug.form).toBe('TABLET')
  })

  it('should create valid SearchResult object', () => {
    const searchResult: SearchResult = {
      drugs: [],
      total: 0,
      query: 'paracetamol',
      disclaimer: DISCLAIMER,
    }

    expect(searchResult.query).toBe('paracetamol')
    expect(searchResult.total).toBe(0)
    expect(searchResult.disclaimer).toBe(DISCLAIMER)
  })
})