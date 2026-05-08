import Link from 'next/link';
import { SearchBar, SearchInput, SearchButton } from '@/components/search-bar';

export default function Home() {
  const popularSearches = [
    'Paracetamol',
    'Amoxicillin',
    'Ibuprofen',
    'Omeprazole',
    'Metformin',
    'Aspirin',
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#004ac6' }}>
            Medik
          </h1>
          <p className="text-xl mb-2" style={{ color: '#4a5568' }}>
            Database Informasi Obat Indonesia
          </p>
          <p className="text-gray-600 mb-8">
            Search for drug information by symptom, illness, or drug name.
            Get detailed information from openFDA, RxNorm, and BPOM.
          </p>

          {/* Search Bar */}
          <form action="/search" method="get" className="w-full max-w-md mx-auto mb-8">
            <SearchBar>
              <div className="flex gap-2">
                <SearchInput 
                  name="q"
                  placeholder="Cari berdasarkan gejala, penyakit, atau nama obat..."
                />
                <SearchButton>Cari</SearchButton>
              </div>
            </SearchBar>
          </form>

          {/* Popular Searches */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Pencarian Populer / Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <Link
                  key={search}
                  href={`/search?q=${encodeURIComponent(search)}`}
                  className="px-4 py-2 rounded-full text-sm transition-colors"
                  style={{ 
                    backgroundColor: '#e8f4fd',
                    color: '#004ac6',
                  }}
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-8" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="font-semibold mb-1">Cari Obat</h3>
            <p className="text-sm text-gray-600">
              Search by symptom, illness, or drug name
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold mb-1">Informasi Lengkap</h3>
            <p className="text-sm text-gray-600">
              Complete drug information from trusted sources
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🇮🇩</div>
            <h3 className="font-semibold mb-1">Data Indonesia</h3>
            <p className="text-sm text-gray-600">
              Includes BPOM registered medications
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}