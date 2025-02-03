import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/search/Search';
import Result from '../../components/result/Result';
import Spinner from '../../components/spinner/Spinner';
import Fallback from '../../components/fallback/Fallback';
import { fetchSearchResults } from '../../services/Api';
import DetailsPage from '../DetailsPage/DetailsPage';
import styles from './MainPage.module.css';

const defaultQuery = '';

const MainPage = () => {
  const [query, setQuery] = useSearchQuery();
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);
      setError(null);
      setIsLoading(true);

      try {
        const result = await fetchSearchResults(searchQuery);
        setResult(result);
      } catch {
        setError('Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [setQuery]
  );

  useEffect(() => {
    const initialQuery = query || defaultQuery;
    handleSearch(initialQuery);
  }, [query, handleSearch]);

  const handlePersonClick = (id: string) => {
    setSearchParams({ frontpage: '2', details: id });
  };

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.container}>
      <p className={styles.greeting}>
        Welcome to the Star Wars Universe Explorer! Dive into the galaxy far,
        far away and uncover fascinating details about your favorite Star Wars
        characters. Whether you are a Jedi, Sith, or just a curious traveler, my
        app helps you connect with the iconic personalities of this legendary
        saga. Simply type a name or last name into the search bar, and you will
        discover key facts, hidden secrets, and more about the person you are
        looking for.
      </p>
      <Search onSearchClick={handleSearch} />
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
      <div className={styles.resultsContainer}>
        <div className={styles.resultsLeft}>
          {result && <Result data={result} onPersonClick={handlePersonClick} />}
        </div>
        <div className={styles.resultsRight}>
          {searchParams.get('details') && (
            <DetailsPage
              id={searchParams.get('details') ?? ''}
              onClose={handleCloseDetails}
            />
          )}
        </div>
      </div>
      <Fallback />
    </div>
  );
};

export default MainPage;
