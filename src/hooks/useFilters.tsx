import { useState } from 'react';
import { CountryType } from '../types/types';

export const useFilters = (countries: CountryType[]) => {
  const [selectedRegion, setSelectedRegion] = useState('All regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'population' | 'name'>('population');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredCountries = () => {
    return [...countries]
      .filter(
        (country) =>
          selectedRegion === 'All regions' || country.region === selectedRegion
      )
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        sortBy === 'population'
          ? sortOrder === 'asc'
            ? a.population - b.population
            : b.population - a.population
          : sortOrder === 'asc'
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common)
      );
  };

  const resetFilters = () => {
    setSelectedRegion('All regions');
    setSearchQuery('');
    setSortBy('population');
    setSortOrder('asc');
  };

  return {
    selectedRegion,
    setSelectedRegion,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredCountries,
    resetFilters,
  };
};
