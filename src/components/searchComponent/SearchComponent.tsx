import React from 'react';
import { SearchProps } from '../../types/types';

export const SearchComponent = React.memo(
  ({ searchQuery, onSearchChange }: SearchProps) => {
    return (
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search for a country"
      />
    );
  }
);

SearchComponent.displayName = 'SearchComponent';
