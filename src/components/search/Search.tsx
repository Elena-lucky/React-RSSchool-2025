import { useCallback } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import styles from './Search.module.css';

type SearchProps = {
  onSearchClick: (query: string) => void;
};

const Search = ({ onSearchClick }: SearchProps) => {
  const [query, setQuery, resetQuery] = useSearchQuery();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = useCallback(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearchClick(trimmedQuery);
    }
  }, [query, onSearchClick]);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    resetQuery();
    window.location.reload();
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        placeholder="What are you searching?"
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={!query.trim()}
      >
        Search
      </button>
      <button className={styles.searchButton} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Search;
