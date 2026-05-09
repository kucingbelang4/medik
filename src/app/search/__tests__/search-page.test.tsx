import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the cache and search utilities using vitest
vi.mock('@/lib/cache');
vi.mock('@/lib/search');

import SearchPage from '@/app/search/page';
import { getCachedSearch, setCachedSearch } from '@/lib/cache';
import { searchDrugs } from '@/lib/search';

describe('SearchPage component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders empty state when no query', async () => {
    const props = { searchParams: {} };
    // Call SearchPage as a function because it's a Server Component (async)
    const result = await SearchPage(props);
    render(result);
    expect(screen.getByText(/Enter a medicine name, symptom, or illness to search/)).toBeInTheDocument();
  });

  it('renders cached results when query present and cache hit', async () => {
    const fakeDrugs = [
      {
        id: 'NDC-12345',
        source: 'openFDA',
        genericName: 'Acetaminophen',
        brandNames: ['Tylenol'],
        dosage: '',
        indications: '',
        warnings: '',
        contraindications: '',
        interactions: '',
        lastUpdated: '',
      },
    ];
    vi.mocked(getCachedSearch).mockResolvedValue(fakeDrugs);

    const props = { searchParams: { q: 'tylenol' } };
    const result = await SearchPage(props);
    render(result);

    // Wait for async rendering
    const drugCard = await screen.findByText(/search results for "tylenol"/i);
    expect(drugCard).toBeInTheDocument();
    expect(screen.getByText('Acetaminophen')).toBeInTheDocument();
    expect(setCachedSearch).not.toHaveBeenCalled();
  });

  it('fetches from API when cache miss', async () => {
    const apiDrugs = [
      {
        id: 'NDC-67890',
        source: 'openFDA',
        genericName: 'Ibuprofen',
        brandNames: ['Advil'],
        dosage: '',
        indications: '',
        warnings: '',
        contraindications: '',
        interactions: '',
        lastUpdated: '',
      },
    ];
    vi.mocked(getCachedSearch).mockResolvedValue(null);
    vi.mocked(searchDrugs).mockResolvedValue({ drugs: apiDrugs, errors: [] });

    const props = { searchParams: { q: 'ibuprofen' } };
    const result = await SearchPage(props);
    render(result);

    // Should display results after API call resolves
    const searchHeader = await screen.findByText(/search results for "ibuprofen"/i);
    expect(searchHeader).toBeInTheDocument();
    expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    expect(searchDrugs).toHaveBeenCalled();
    expect(setCachedSearch).toHaveBeenCalledWith('ibuprofen', apiDrugs);
  });
});
