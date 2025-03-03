import { useRouter } from 'next/router';
import {
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  useRef,
} from 'react';
import Search from '../components/search/Search';
import Result from '../components/result/Result';
import Spinner from '../components/spinner/Spinner';
import Pagination from '../components/pagination/Pagination';
import Flyout from '../components/flyout/Flyout';
import {
  apiSlice,
  getPerson,
  getRunningQueriesThunk,
} from '../services/Api/apiSlice';
import { wrapper } from '../store/store';
import { MainPageProps } from '../utils/types';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/themeToggle/ThemeToggle';
import styles from '../styles/MainPage.module.css';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context): Promise<{ props: object }> => {
      const { query, page } = context.query;

      const searchQuery = typeof query === 'string' ? query : '';
      const currentPage =
        typeof page === 'string' ? parseInt(page, 10) || 1 : 1;

      await store.dispatch(
        getPerson.initiate({ query: searchQuery, page: currentPage })
      );

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return {
        props: {
          searchQuery,
          currentPage,
        },
      };
    }
);

const MainPage = ({ searchQuery, currentPage }: MainPageProps): ReactNode => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { query: routerQuery } = router;
  const { theme, toggleTheme } = useTheme();
  const listRef = useRef(null);
  const { data } = apiSlice.useGetPersonQuery({
    query: searchQuery,
    page: currentPage,
  });

  const isDetailsPage =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/people/[id]');

  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push({ pathname: '/', query: { ...routerQuery, page: newPage } });
    },
    [router, routerQuery]
  );

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

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
        <Search searchQuery={searchQuery} />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div
        className={`${styles.content} ${isDetailsPage ? styles.splitView : ''}`}
      >
        <div className={styles.leftSection}>
          {loading && <Spinner />}
          {data && data.results.length > 0 ? (
            <Result
              searchQuery={searchQuery}
              currentPage={currentPage}
              ref={listRef}
            />
          ) : (
            <p>No results found</p>
          )}
        </div>
        {isDetailsPage && (
          <div
            className={`${styles.rightSection} ${isDetailsPage ? styles.visible : ''}`}
          ></div>
        )}
      </div>
      {data && data.count > 0 && (
        <Pagination
          currentPage={currentPage}
          hasPrevious={!!data.previous}
          hasNext={!!data.next}
          onPageChange={handlePageChange}
        />
      )}
      <Flyout />
    </div>
  );
};
export default MainPage;
