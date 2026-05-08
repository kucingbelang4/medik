import React from 'react';

interface SearchButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export function SearchButton({ onClick, children = 'Search' }: SearchButtonProps) {
  return (
    <button
      type="submit"
      className="search-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SearchButton;