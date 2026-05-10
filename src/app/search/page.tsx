import React from 'react';
import { getCachedSearch, setCachedSearch } from '@/lib/cache';
import { searchDrugs } from '@/lib/search';
import { Drug } from '@/types/drug';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SearchResultItem from '@/components/search-results/search-result-item';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim() || '';

  if (query === '') {
    return (
      <>
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto px-margin py-xl">
          {/* Empty search - simplified for now */}
          <section className="mb-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
              <div>
                <h1 className="font-h1 text-h1 text-on-surface mb-xs">Search Medicines</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Enter a medicine name, symptom, or illness to search our database.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const cached = await getCachedSearch(query);
  if (cached) {
    return <SearchResults drugs={cached} query={query} />;
  }

  let drugs: Drug[] = [];
  let errors: string[] = [];
  try {
    const result = await searchDrugs(query);
    drugs = result.drugs;
    errors = result.errors;
  } catch (error) {
    console.error('Search failed:', error);
    errors.push('Unexpected error');
  }

  if (drugs.length > 0) {
    await setCachedSearch(query, drugs);
  }

  return <SearchResults drugs={drugs} query={query} errors={errors} />;
}

function SearchResults({ 
  drugs, 
  query, 
  errors = [] 
}: {
  drugs: Drug[];
  query: string;
  errors?: string[];
}) {
  return (
    <>
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-margin py-xl">
        <section className="mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
            <div>
              <h1 className="font-h1 text-h1 text-on-surface mb-xs">
                Search results for <span className="font-bold">"{query}"</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {drugs.length} results
              </p>
            </div>
            <div className="flex items-center gap-sm">
              <button className="flex items-center gap-xs px-4 py-2 bg-surface-container rounded-lg font-label-bold text-label-bold text-on-surface hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]" data-icon="sort">sort</span>
                Relevance
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-sm mb-xl">
            <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-bold text-label-bold shadow-sm transition-all active:scale-95">
              All Results
            </button>
            <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-bold text-label-bold hover:bg-surface-variant transition-all active:scale-95">
              Medicines
            </button>
            <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-bold text-label-bold hover:bg-surface-variant transition-all active:scale-95">
              Illnesses
            </button>
            <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-bold text-label-bold hover:bg-surface-variant transition-all active:scale-95">
              Medical Guides
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
          {/* Main results column */}
          <div className="md:col-span-8 space-y-md">
            {drugs.length === 0 ? (
              <div className="text-center py-24">
                <h2 className="font-h2 text-h2 text-on-surface mb-lg">
                  No results for <span className="font-bold">"{query}"</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
                  Try a different search or check spelling.
                </p>
                <div className="mt-lg flex justify-center flex-wrap gap-sm">
                  {['paracetamol', 'ibuprofen', 'amoxicillin', 'metformin', 'atorvastatin'].map(
                    (term) => (
                      <a
                        key={term}
                        href={`/search?q=${encodeURIComponent(term)}`}
                        className="font-label-sm text-label-sm text-primary hover:underline"
                      >
                        {term}
                      </a>
                    )
                  )}
                </div>
              </div>
            ) : (
              <>
                {drugs.map((drug) => {
                  // Convert Drug to SearchResultItem format
                  const category = (drug.source === 'BPOM' || drug.source === 'RxNorm') ? 'Illness' : 'Medicine';
                  const title = drug.brandNames && drug.brandNames.length > 0 ? drug.brandNames[0] : (drug.genericName !== 'Unknown' ? drug.genericName : 'Paracetamol (Example)');
                  const description = drug.indications || drug.warnings || drug.dosage || 'No description available for this medicine.';
                  
                  return (
                    <SearchResultItem
                      key={drug.id || `idx-${Math.random()}`}
                      id={drug.id || 'example-id'}
                      title={title}
                      description={description}
                      category={category}
                      tags={[drug.source, drug.lastUpdated ? `Updated ${drug.lastUpdated.substring(0, 4)}` : '']}
                      source={drug.source}
                    />
                  );
                })}
                
                <div className="pt-lg flex justify-center">
                  <button className="flex items-center gap-sm font-label-bold text-label-bold text-primary hover:underline">
                    Load more results
                    <span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
                  </button>
                </div>
              </>
            )}
          </div>
          
          {/* Sidebar - Common Searches */}
          <aside className="md:col-span-4 space-y-md">
            <div className="bg-surface-container-low p-lg rounded-xl">
              <h4 className="font-label-bold text-label-bold text-on-surface mb-md flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary" data-icon="trending_up">trending_up</span>
                Common Searches
              </h4>
              <ul className="space-y-sm">
                <li>
                  <a className="font-body-md text-body-md text-primary hover:underline" href="/search?q=paracetamol">
                    Ibuprofen vs Paracetamol
                  </a>
                </li>
                <li>
                  <a className="font-body-md text-body-md text-primary hover:underline" href="/search?q=dosage">
                    Dosage for children
                  </a>
                </li>
                <li>
                  <a className="font-body-md text-body-md text-primary hover:underline" href="/search?q=side-effects">
                    Side effects of long-term use
                  </a>
                </li>
                <li>
                  <a className="font-body-md text-body-md text-primary hover:underline" href="/search?q=alcohol">
                    Interaction with alcohol
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}