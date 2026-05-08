import React from 'react';
import { useSearchBar } from './search-bar';

export function SearchSuggestions() {
  const { suggestions, setSuggestions, isLoading } = useSearchBar();

  // In a real implementation, we would fetch suggestions based on the query
  // This is a placeholder that shows static suggestions
  // You would connect this to an API or use the query to fetch real suggestions

  if (isLoading) {
    return (
      <div className="suggestions-loading">
        Loading suggestions...
      </div>
    );
  }

  return (
    <div className="search-suggestions">
      <h3>Suggestions</h3>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
        {suggestions.length === 0 && (
          <li>No suggestions</li>
        )}
      </ul>
    </div>
  );
}

export default SearchSuggestions;