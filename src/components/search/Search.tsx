import { useState, useEffect } from 'react';
import styles from './Search.module.css';

type SearchProps = {
  onSearchClick: (query: string) => void;
};

const Search = ({ onSearchClick }: SearchProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery('');
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      localStorage.setItem('searchQuery', trimmedQuery);
      onSearchClick(trimmedQuery);
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      handleSearch();
    }
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
    </div>
  );
};

export default Search;
