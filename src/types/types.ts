export interface CountryType {
  name: {
    common: string;
  };
  region: string;
  population: number;
  flags: {
    png: string;
  };
}

export interface CountryCardProps {
  country: CountryType;
}

export interface FilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface SortProps {
  sortBy: 'population' | 'name';
  sortOrder: 'asc' | 'desc';
  onSortChange: (by: 'population' | 'name', order: 'asc' | 'desc') => void;
}

export interface VisitedCountryProps {
  countryName: string;
  onToggle: (isChecked: boolean) => void;
  isChecked: boolean;
}
