import { useState, useCallback, useEffect } from 'react';
import useSearchQuery from './hooks/useSearchQuery';
import Search from './components/search/Search';
import Result from './components/result/Result';
import Spinner from './components/spinner/Spinner';
import ErrorBoundary from './components/error boundary/ErrorBoundary';
import Fallback from './components/fallback/Fallback';
import { fetchSearchResults } from './services/Api';
import './App.css';

const defaultQuery = '';

const App = () => {
  const [query, setQuery] = useSearchQuery();
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <ErrorBoundary>
      <div>
        <p className="greeting">
          Welcome to the Star Wars Universe Explorer! Dive into the galaxy far,
          far away and uncover fascinating details about your favorite Star Wars
          characters. Whether you are a Jedi, Sith, or just a curious traveler,
          my app helps you connect with the iconic personalities of this
          legendary saga. Simply type a name or last name into the search bar,
          and you will discover key facts, hidden secrets, and more about the
          person you are looking for.
        </p>
        <Search onSearchClick={handleSearch} />
        {isLoading && <Spinner />}
        {error && <p>{error}</p>}
        {result && <Result data={result} />}
        <Fallback />
      </div>
    </ErrorBoundary>
  );
};

export default App;
