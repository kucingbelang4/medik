'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchBarContextType {
  query: string;
  setQuery: (query: string) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SearchBarContext = createContext<SearchBarContextType | undefined>(undefined);

export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error('useSearchBar must be used within a SearchBar');
  }
  return context;
}

interface SearchBarProps {
  children: ReactNode;
  initialQuery?: string;
}

export function SearchBar({ children, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SearchBarContext.Provider value={{
      query,
      setQuery,
      suggestions,
      setSuggestions,
      isLoading,
      setIsLoading,
    }}>
      <div className="search-bar">
        {children}
      </div>
    </SearchBarContext.Provider>
  );
}

export default SearchBar;