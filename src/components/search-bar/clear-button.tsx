'use client';

import React from 'react';
import { useSearchBar } from './search-bar';

export function ClearButton() {
  const { setQuery, setSuggestions } = useSearchBar();

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <button
      type="button"
      className="clear-button"
      onClick={handleClear}
      aria-label="Clear search"
    >
      ×
    </button>
  );
}

export default ClearButton;