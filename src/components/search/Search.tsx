import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Search.module.css';

type SearchProps = {
  onSearchClick: (query: string) => void;
};

const Search = ({ onSearchClick }: SearchProps) => {
  const [query, setQuery] = useState(
    () => localStorage.getItem('searchQuery') || ''
  );

  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = useCallback(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearchClick(trimmedQuery);
      setSearchParams({ query: trimmedQuery, page: '1' });
    }
  }, [query, onSearchClick, setSearchParams]);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      handleSearch();
    }
  };

  const handleReset = () => {
    localStorage.removeItem('searchQuery');
    setQuery('');
    navigate('/');
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
