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

// Types for Medik
export interface Drug {
  registrationNumber: string
  productName: string
  form: string
  strength: string
  packaging: string
  applicant: string
  manufacturer: string
  registrationDate: string
  status: string
  class: string
  category: string
}

export interface SearchResult {
  drugs: Drug[]
  total: number
  query: string
  disclaimer: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
