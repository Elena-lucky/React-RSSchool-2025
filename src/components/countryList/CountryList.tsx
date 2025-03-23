import { CountryType } from '../../types/types';
import { FilterComponent } from '../filterComponent/FilterComponent';
import { SearchComponent } from '../searchComponent/SearchComponent';
import { SortComponent } from '../sortComponent/SortComponent';
import { useCountries } from '../../hooks/useCountries';
import { useFilters } from '../../hooks/useFilters';
import { CountryCard } from '../countryCard/CountryCard';
import styles from './CountryList.module.css';

export const CountryList = () => {
  const { countries, loading, error } = useCountries();
  const {
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
  } = useFilters(countries);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className={styles.filters}>
        <FilterComponent
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
        <SearchComponent
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <SortComponent
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(by: 'population' | 'name', order: 'asc' | 'desc') => {
            setSortBy(by);
            setSortOrder(order);
          }}
        />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div>
        <h1>List of Countries</h1>
        {filteredCountries.length === 0 ? (
          <p>No countries found</p>
        ) : (
          <ul className={styles.listCountry}>
            {filteredCountries.map((country: CountryType, index: number) => (
              <CountryCard key={index} country={country} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
