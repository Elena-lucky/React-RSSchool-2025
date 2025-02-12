import { useState, useCallback, useEffect } from 'react';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/search/Search';
import Result from '../../components/result/Result';
import Spinner from '../../components/spinner/Spinner';
import Pagination from '../../components/pagination/Pagination';
import Fallback from '../../components/fallback/Fallback';
import { fetchSearchResults } from '../../services/Api';
import { ApiResponse } from '../../utils/types';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../../components/themeToggle/ThemeToggle';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [query, setQuery] = useSearchQuery();
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const currentPage = Number(searchParams.get('page')) || 1;
  const isDetailsPage = location.pathname.startsWith('/person/');

  const fetchData = useCallback(async (searchQuery: string, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchSearchResults(searchQuery, page);
      setResult(data);
    } catch {
      setError('Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      setSearchParams({ query: searchQuery, page: '1' });
      fetchData(searchQuery, 1);
    },
    [setQuery, setSearchParams, fetchData]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams((prevParams) => ({
        ...Object.fromEntries(prevParams.entries()),
        page: String(newPage),
      }));
      fetchData(query, newPage);
    },
    [query, setSearchParams, fetchData]
  );

  useEffect(() => {
    if (!isDetailsPage) {
      fetchData(query, currentPage);
    }
  }, [query, currentPage, fetchData]);

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
      <div className={styles.usersInput}>
        <Search onSearchClick={handleSearch} />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> {}
      </div>
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
        {isDetailsPage && (
          <div
            className={`${styles.rightSection} ${isDetailsPage ? styles.visible : ''}`}
          >
            <Outlet />
          </div>
        )}
      </div>
      {result && result.count > 0 && (
        <Pagination
          currentPage={currentPage}
          hasPrevious={!!result.previous}
          hasNext={!!result.next}
          onPageChange={handlePageChange}
        />
      )}
      <Fallback />
    </div>
  );
};

export default MainPage;
