import { useState, useCallback, useEffect } from 'react';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/search/Search';
import Result from '../../components/result/Result';
import Spinner from '../../components/spinner/Spinner';
import Fallback from '../../components/fallback/Fallback';
import { fetchSearchResults } from '../../services/Api';
import { ApiResponse } from '../../utils/types';
import styles from './MainPage.module.css';

const defaultQuery = '';

const MainPage = () => {
  const [query, setQuery] = useSearchQuery();
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentPage = Number(searchParams.get('page')) || 1;
  const isDetailsPage = location.pathname.startsWith('/person/');

  const handleSearch = useCallback(
    async (searchQuery: string, page: number = 1) => {
      setQuery(searchQuery);
      setError(null);
      setIsLoading(true);
      setSearchParams(() => ({
        query: searchQuery,
        page: String(page),
      }));

      try {
        const data = await fetchSearchResults(searchQuery, page);
        setResult(data);
      } catch {
        setError('Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [setQuery, setSearchParams]
  );

  useEffect(() => {
    const initialQuery = query || defaultQuery;
    if (!isDetailsPage) {
      handleSearch(initialQuery, currentPage);
    }
  }, [query, currentPage, handleSearch, isDetailsPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prevParams) => ({
      query: prevParams.get('query') || defaultQuery,
      page: String(newPage),
    }));
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
      <Search onSearchClick={(searchQuery) => handleSearch(searchQuery, 1)} />
      <div
        className={`${styles.content} ${isDetailsPage ? styles.splitView : ''}`}
      >
        <div className={styles.leftSection}>
          {isLoading && <Spinner />}
          {error && <p>{error}</p>}
          {result && result.results.length > 0 ? (
            <Result data={result} />
          ) : (
            <p>No results found</p>
          )}
        </div>

        {}
        <div
          className={`${styles.rightSection} ${isDetailsPage ? styles.visible : ''}`}
        >
          <Outlet />
        </div>
      </div>

      {result && result.count > 0 && (
        <div className={styles.pagination}>
          <button
            disabled={!result.previous}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            disabled={!result.next}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
      <Fallback />
    </div>
  );
};

export default MainPage;
