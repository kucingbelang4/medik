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
      registrationNumber: 'DKI1234567890',
      productName: 'PARACETAMOL 500 MG TABLET',
      form: 'TABLET',
      strength: '500 MG',
      packaging: '10 TABLET',
      applicant: 'PT Contoh Farma',
      manufacturer: 'PT Contoh Farma Indonesia',
      registrationDate: '01-01-2023',
      status: 'BERLAKU',
      class: 'OBAT KLASIK',
      category: 'OBAT BEBAS TERBATAS',
    }

    expect(drug.registrationNumber).toBe('DKI1234567890')
    expect(drug.productName).toBe('PARACETAMOL 500 MG TABLET')
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
