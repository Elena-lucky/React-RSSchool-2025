import { useCallback } from 'react';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/search/Search';
import Result from '../../components/result/Result';
import Spinner from '../../components/spinner/Spinner';
import Pagination from '../../components/pagination/Pagination';
import Flyout from '../../components/flyout/Flyout';
import { useGetPersonQuery } from '../../services/Api/apiSlice';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../../components/themeToggle/ThemeToggle';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [query, setQuery] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const currentPageFromState = location.state?.currentPage;
  const currentPage =
    currentPageFromState || Number(searchParams.get('page')) || 1;
  const isDetailsPage = location.pathname.startsWith('/people/');

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useGetPersonQuery({ query, page: currentPage });

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      setSearchParams({ query: searchQuery, page: '1' });
    },
    [setQuery, setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams((prevParams) => ({
        ...Object.fromEntries(prevParams.entries()),
        page: String(newPage),
      }));
    },
    [setSearchParams]
  );

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
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div
        className={`${styles.content} ${isDetailsPage ? styles.splitView : ''}`}
      >
        <div className={styles.leftSection}>
          {isLoading && <Spinner />}
          {isError && <p>Error: {error?.toString()}</p>} {}
          {apiResponse?.results.length > 0 ? (
            <Result data={apiResponse} />
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
      {apiResponse?.count > 0 && (
        <Pagination
          currentPage={currentPage}
          hasPrevious={!!apiResponse.previous}
          hasNext={!!apiResponse.next}
          onPageChange={handlePageChange}
        />
      )}
      {}
      <Flyout />
    </div>
  );
};

export default MainPage;
