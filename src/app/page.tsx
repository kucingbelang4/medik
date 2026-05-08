import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Disclaimer - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-t border-outline-variant py-sm">
        <div className="max-w-7xl mx-auto text-center font-label-sm text-label-sm text-on-surface-variant px-margin">
          Informasi ini hanya untuk tujuan edukasi. Ini BUKAN nasihat medis. 
          Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi obat apapun. 
          Dalam keadaan darurat, hubungi layanan darurat setempat.
        </div>
      </div>
      
      {/* Main content with padding for fixed disclaimer */}
      <div className="pb-20 flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero Section */}
        <section className="px-margin pt-24 pb-32 max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
          <h1 className="font-h1 text-h1 text-on-surface mb-md">
            How can we help you today?
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
            Access clinical information on medicines, conditions, and health services through our professional-grade search portal.
          </p>
          
          {/* Search Bar - rounded-full with internal icon */}
          <div className="relative max-w-3xl mx-auto w-full">
            <div className="flex items-center bg-surface-container-low rounded-full px-lg py-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all">
              {/* Search Icon */}
              <svg className="w-6 h-6 text-outline mr-md shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 15a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              
              {/* Input */}
              <input 
                placeholder="Search medicines, symptoms, or illnesses..." 
                name="q"
                className="bg-transparent border-none focus:ring-0 w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant"
                style={{ outline: 'none' }}
              />
              
              {/* Search Button - pill shaped */}
              <button 
                type="submit"
                className="bg-primary text-on-primary font-label-bold text-label-bold px-xl py-md rounded-full active:scale-95 transition-transform shadow-lg shadow-primary/20 hover:opacity-90"
              >
                Search
              </button>
            </div>
            
            {/* Trending Section */}
            <div className="mt-lg flex justify-center items-center gap-sm flex-wrap">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Trending:</span>
              {['Ibuprofen', 'Seasonal Allergies', 'Diabetes Management'].map((term) => (
                <Link 
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="font-label-sm text-label-sm text-primary hover:underline"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Simplified Grid - 3 columns */}
        <section className="px-margin py-xl max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Medicine Search Card - spans 2 cols */}
            <div className="md:col-span-2 bg-surface-container-lowest p-xl rounded-xl shadow-[0_4px_20px_rgba(30,41,59,0.05)] hover:shadow-lg transition-shadow group cursor-pointer flex flex-col md:flex-row items-center gap-xl">
              <div className="flex-1">
                <div className="bg-primary-container text-on-primary-container inline-flex p-sm rounded-lg mb-md">
                  {/* Medication Icon - using SVG instead of Material Symbols */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3 0l-.318-.158a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547m0 0a2 2 0 01.698.698l.252.126a10.99 10.99 0 01-3.86-.517l-2.387-.477a2 2 0 00-1.022.547m0 0h-.001M5 19h14" />
                  </svg>
                </div>
                <h2 className="font-h2 text-h2 mb-sm">Search Medicines</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                  Comprehensive database of clinical pharmacology, dosages, and contraindications verified by medical boards.
                </p>
                <button className="text-primary font-label-bold text-label-bold flex items-center gap-xs group-hover:gap-sm transition-all">
                  Browse A-Z Guide 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m-7-7l7 7m-7-7V20m6 0v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
              <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  Drug Image Placeholder
                </div>
              </div>
            </div>
            
            {/* Clinical Standards Badge */}
            <div className="bg-tertiary-fixed text-on-tertiary-fixed p-xl rounded-xl shadow-[0_4px_20px_rgba(30,41,59,0.05)] flex flex-col justify-center">
              <span className="font-label-bold text-label-bold uppercase tracking-widest opacity-70 mb-sm">Verified Reliability</span>
              <h3 className="font-h3 text-h3 mb-md">Clinical Standards</h3>
              <p className="font-body-md text-body-md opacity-90">
                All Medik content is reviewed monthly by our certified Medical Board of directors to ensure absolute clinical accuracy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}