import React from 'react';
import { DrugCard, DrugCardHeader, DrugCardBody, DrugCardFooter } from '@/components/drug-card';
import { getCachedSearch, setCachedSearch } from '@/lib/cache';
import { searchDrugs } from '@/lib/search';
import { Drug } from '@/types/drug';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim() || '';

  if (query === '') {
    return (
      <section className="px-margin py-24 max-w-5xl mx-auto">
        <h1 className="font-h1 text-h1 text-on-surface mb-md">Search Medicines</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
          Enter a medicine name, symptom, or illness to search our database.
        </p>
        <div className="max-w-3xl mx-auto">
          <form action="/search" method="get" className="flex items-center bg-surface-container-low rounded-full px-lg py-3 shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined text-outline mr-md" data-icon="search">search</span>
            <input
              name="q"
              type="text"
              placeholder="Search medicines, symptoms, or illnesses..."
              className="flex-1 bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant outline-none"
              aria-label="Search medicines"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary font-label-bold text-label-bold px-xl py-md rounded-full active:scale-95 transition-transform"
            >
              Search
            </button>
          </form>
        </div>
        <div className="mt-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Try searching for paracetamol, ibuprofen, or amoxicillin.
          </p>
        </div>
      </section>
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
  errors = [],
}: {
  drugs: Drug[];
  query: string;
  errors?: string[];
}) {
  return (
    <section className="px-margin py-24 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-xl">
        <h1 className="font-h1 text-h1 text-on-surface">
          Search results for "{query}"
        </h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          {drugs.length} results
        </p>
      </div>

      {drugs.length === 0 ? (
        <div className="text-center py-24">
          <h2 className="font-h2 text-h2 text-on-surface mb-lg">
            No results for "{query}"
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
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-3">
          {drugs.map((drug) => (
            <DrugCard key={drug.id} drug={drug}>
              <DrugCardHeader />
              <DrugCardBody />
              <DrugCardFooter />
            </DrugCard>
          ))}
        </div>
      )}
    </section>
  );
}