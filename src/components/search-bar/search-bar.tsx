'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchBarContextType {
  query: string;
  setQuery: (query: string) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SearchBarContext = createContext<SearchBarContextType>({
  query: '',
  setQuery: () => {},
  suggestions: [],
  setSuggestions: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error('useSearchBar must be used within a SearchBar');
  }
  return context;
}

interface SearchBarProps {
  children: ReactNode;
  className?: string;
}

export default function SearchBar({ children, className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SearchBarContext.Provider value={{ query, setQuery, suggestions, setSuggestions, isLoading, setIsLoading }}>
      <div className={`search-bar ${className || ''}`}>
        {children}
      </div>
    </SearchBarContext.Provider>
  );
}