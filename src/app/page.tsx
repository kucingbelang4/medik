import Link from 'next/link';
import SearchBar from '@/components/search-bar/search-bar';
import SearchInput from '@/components/search-bar/search-input';
import SearchButton from '@/components/search-bar/search-button';
export default function Home() {
  return (
    <>
      {/* Disclaimer - fixed at bottom - from DESIGN.md */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-t border-outline-variant p-4">
        <div className="max-w-4xl mx-auto text-center text-sm" style={{ color: 'var(--on-surface)' }}>
          Informasi ini hanya untuk tujuan edukasi. Ini BUKAN nasihat medis. 
          Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi obat apapun. 
          Dalam keadaan darurat, hubungi layanan darurat setempat.
        </div>
      </div>
      
      {/* Main content with padding for fixed disclaimer */}
      <div className="pb-20" style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero Section - Clinical Minimalism: generous whitespace */}
        <section className="flex flex-col items-center justify-center px-8 py-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="text-center" style={{ maxWidth: '672px', width: '100%' }}>
            {/* Medik Title - h1: 40px, bold, -0.02em letterSpacing */}
            <h1 className="font-bold mb-4" style={{ 
              fontSize: '40px', 
              lineHeight: '1.2', 
              letterSpacing: '-0.02em',
              color: 'var(--primary)'
            }}>
              Medik
            </h1>
            
            {/* Subtitle - body-lg: 18px, color: on-surface-variant */}
            <p className="mb-2" style={{ 
              fontSize: '18px', 
              lineHeight: '1.6',
              color: 'var(--on-surface-variant)'
            }}>
              Database Informasi Obat Indonesia
            </p>
            
            {/* Description - body-md: 16px */}
            <p className="mb-8" style={{ 
              fontSize: '16px', 
              lineHeight: '1.6',
              color: 'var(--on-surface-variant)',
              maxWidth: '576px',
              margin: '0 auto 32px'
            }}>
              Search for drug information by symptom, illness, or drug name. 
              Get detailed information from openFDA, RxNorm, and BPOM.
            </p>
            
            {/* Search Form - "well effect" input (no border, slightly darker bg) */}
            <form 
              className="mx-auto"
              style={{ maxWidth: '448px', width: '100%', marginBottom: '32px' }}
              action="/search"
              method="get"
            >
              <div className="flex gap-2">
                {/* Input - "well effect": no border, bg-surface-container-low */}
                <input 
                  placeholder="Cari berdasarkan gejala, penyakit, atau nama obat..." 
                  name="q"
                  className="flex-1 px-4 py-3 outline-none transition-colors"
                  style={{ 
                    backgroundColor: 'var(--surface-container-low)',
                    borderRadius: 'var(--radius-sm)', // 8px
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'var(--on-surface)',
                    boxShadow: 'var(--shadow-level-1)',
                  }}
                />
                {/* Button - Primary: Medik Blue, 8px rounded */}
                <button 
                  type="submit"
                  className="px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                    borderRadius: 'var(--radius-sm)', // 8px
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Cari
                </button>
              </div>
            </form>
            
            {/* Popular Searches - label-sm: 12px, semibold, 0.04em letterSpacing */}
            <div className="text-left">
              <h3 className="font-semibold mb-3" style={{ 
                fontSize: '12px', 
                lineHeight: '1.2',
                letterSpacing: '0.04em',
                color: 'var(--on-surface-variant)',
                textTransform: 'uppercase'
              }}>
                Pencarian Populer / Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Metformin', 'Aspirin'].map((drug) => (
                  <Link 
                    key={drug}
                    href={`/search?q=${drug}`}
                    className="px-4 py-2 transition-colors hover:opacity-80"
                    style={{ 
                      backgroundColor: 'var(--primary-fixed)',
                      color: 'var(--on-primary-fixed)',
                      borderRadius: '9999px', // full rounded
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {drug}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section - Cards: no borders, shadow-level-1, generous padding */}
        <section style={{ backgroundColor: 'var(--surface-container-lowest)' }}>
          <div className="mx-auto px-8 py-12" style={{ maxWidth: '896px' }}>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '32px' }}>
              {/* Feature 1 */}
              <div className="text-center" style={{ padding: '24px' }}>
                <div className="mx-auto mb-4 flex items-center justify-center" style={{ 
                  width: '48px', 
                  height: '48px',
                  backgroundColor: 'var(--primary-fixed)',
                  borderRadius: 'var(--radius-md)', // 12px
                }}>
                  {/* Search Icon */}
                  <svg style={{ width: '24px', height: '24px', color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 15a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1" style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.4',
                  color: 'var(--on-surface)'
                }}>
                  Cari Obat
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  color: 'var(--on-surface-variant)'
                }}>
                  Search by symptom, illness, or drug name
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="text-center" style={{ padding: '24px' }}>
                <div className="mx-auto mb-4 flex items-center justify-center" style={{ 
                  width: '48px', 
                  height: '48px',
                  backgroundColor: 'var(--primary-fixed)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  {/* Info Icon */}
                  <svg style={{ width: '24px', height: '24px', color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1" style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.4',
                  color: 'var(--on-surface)'
                }}>
                  Informasi Lengkap
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  color: 'var(--on-surface-variant)'
                }}>
                  Complete drug information from trusted sources
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="text-center" style={{ padding: '24px' }}>
                <div className="mx-auto mb-4 flex items-center justify-center" style={{ 
                  width: '48px', 
                  height: '48px',
                  backgroundColor: 'var(--primary-fixed)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  {/* Heart Icon */}
                  <svg style={{ width: '24px', height: '24px', color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1" style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.4',
                  color: 'var(--on-surface)'
                }}>
                  Data Indonesia
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  color: 'var(--on-surface-variant)'
                }}>
                  Includes BPOM registered medications
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}