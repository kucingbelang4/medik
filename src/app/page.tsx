import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Header – the top app bar from STITCH */}
      <header className="bg-surface sticky top-0 z-50 shadow-sm border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-margin py-md max-w-7xl mx-auto">
          <Link href="/" className="font-h3 text-h3 font-bold text-primary tracking-tight">
            Medik
          </Link>
          <nav className="hidden md:flex items-center gap-xl">
            <Link href="/medicines" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors">
              Medicines
            </Link>
            <Link href="/illnesses" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors">
              Illnesses
            </Link>
            <Link href="/index" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors">
              A‑Z Index
            </Link>
          </nav>
          <button className="p-2 rounded-full text-primary hover:bg-primary/5" aria-label="Account">
            <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="px-margin pt-24 pb-32 max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
        <h1 className="font-h1 text-h1 text-on-surface mb-md">How can we help you today?</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
          Access clinical information on medicines, conditions, and health services through our professional‑grade search portal.
        </p>
        <div className="relative max-w-3xl mx-auto w-full">
          <form action="/search" method="get">
            <div className="flex items-center bg-surface-container-low rounded-full px-lg py-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all">
              <span className="material-symbols-outlined text-outline mr-md" data-icon="search">search</span>
              <input
                aria-label="Search medicines, symptoms, or illnesses"
                placeholder="Search medicines, symptoms, or illnesses..."
                name="q"
                type="text"
                className="bg-transparent border-none focus:ring-0 w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary font-label-bold text-label-bold px-xl py-md rounded-full active:scale-95 transition-transform shadow-lg shadow-primary/20 hover:opacity-90"
              >
                Search
              </button>
            </div>
          </form>
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

      {/* Feature Grid */}
      <section className="px-margin py-xl max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Medicine Search Card – spans 2 columns */}
          <div className="md:col-span-2 bg-surface-container-lowest p-xl rounded-xl shadow-[0_4px_20px_rgba(30,41,59,0.05)] hover:shadow-lg transition-shadow group cursor-pointer flex flex-col md:flex-row items-center gap-xl">
            <div className="flex-1">
              <div className="bg-primary-container text-on-primary-container inline-flex p-sm rounded-lg mb-md">
                <span className="material-symbols-outlined" data-icon="medication">medication</span>
              </div>
              <h2 className="font-h2 text-h2 mb-sm">Search Medicines</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                Comprehensive database of clinical pharmacology, dosages, and contraindications verified by medical boards.
              </p>
              <Link
                href="/search"
                className="text-primary font-label-bold text-label-bold inline-flex items-center gap-xs group-hover:gap-sm transition-all"
              >
                Browse A‑Z Guide
                <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
              </Link>
            </div>
            <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden bg-surface-container-high flex items-center justify-center">
              <span className="font-label-sm text-label-sm text-outline-variant">Drug Image Placeholder</span>
            </div>
          </div>

          {/* Clinical Standards Card */}
          <div className="bg-tertiary-fixed text-on-tertiary-fixed p-xl rounded-xl shadow-[0_4px_20px_rgba(30,41,59,0.05)] flex flex-col justify-center">
            <span className="font-label-bold text-label-bold uppercase tracking-widest opacity-70 mb-sm">Verified Reliability</span>
            <h3 className="font-h3 text-h3 mb-md">Clinical Standards</h3>
            <p className="font-body-md text-body-md opacity-90">
              All Medik content is reviewed monthly by our certified Medical Board of directors to ensure absolute clinical accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Nav – Mobile only */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-surface shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" aria-label="Mobile navigation">
        <Link href="/search" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1.5 transition-transform active:scale-95">
          <span className="material-symbols-outlined" data-icon="search">search</span>
          <span className="font-label-sm text-label-sm">Search</span>
        </Link>
        <Link href="/medicines" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1.5 hover:bg-surface-variant transition-colors active:scale-95">
          <span className="material-symbols-outlined" data-icon="medication">medication</span>
          <span className="font-label-sm text-label-sm">Medicines</span>
        </Link>
        <Link href="/illnesses" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1.5 hover:bg-surface-variant transition-colors active:scale-95">
          <span className="material-symbols-outlined" data-icon="medical_services">medical_services</span>
          <span className="font-label-sm text-label-sm">Illnesses</span>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/10">
        <div className="w-full px-margin py-xl flex flex-col md:flex-row justify-between items-center gap-md max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <div className="font-h3 text-h3 text-primary font-bold">Medik</div>
            <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left max-w-xs">
              © 2024 Medik Health Platform. Professional Clinical Reliability.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-lg">
            {['Accessibility', 'Privacy Policy', 'Medical Board', 'Contact'].map((link) => (
              <a key={link} href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline transition-all">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
