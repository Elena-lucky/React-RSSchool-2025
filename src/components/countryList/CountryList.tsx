import { useEffect, useState } from 'react';
import { CountryType } from '../../utils/types';
import { fetchCountries } from '../../features/fetchCountries';
import { FilterComponent } from '../filterComponent/FilterComponent';
import { SearchComponent } from '../searchComponent/SearchComponent';
import { SortComponent } from '../sortComponent/SortComponent';
import { CountryCard } from '../countryCard/CountryCard';
import styles from './CountryList.module.css';

export const CountryList = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryType[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All regions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'population' | 'name'>('population');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Failed to fetch countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (selectedRegion !== 'All regions') {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'population') {
        return sortOrder === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      } else {
        return sortOrder === 'asc'
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      }
    });

    setFilteredCountries(filtered);
  }, [selectedRegion, searchQuery, sortBy, sortOrder, countries]);

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
          onSortChange={(by, order) => {
            setSortBy(by);
            setSortOrder(order);
          }}
        />
      </div>
      <div>
        <h1>List of Countries</h1>
        {filteredCountries.length === 0 ? (
          <p>No countries found</p>
        ) : (
          <ul className={styles.listCountry}>
            {filteredCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
