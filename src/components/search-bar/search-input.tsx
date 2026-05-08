'use client';

import React from 'react';
import { useSearchBar } from './search-bar';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Additional props can be added here if needed
}

export function SearchInput(props: SearchInputProps) {
  const { query, setQuery } = useSearchBar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger search (handled by parent or page)
      // We can dispatch a custom event or call a function from context if needed
      // For now, we just update the query and let the page handle the submit
    }
  };

  return (
    <input
      {...props}
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="search-input"
    />
  );
}

export default SearchInput;