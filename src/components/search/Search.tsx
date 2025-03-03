import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './Search.module.css';

type SearchProps = {
  searchQuery?: string;
};

const Search = ({ searchQuery = '' }: SearchProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery) {
      router.push({
        pathname: '/',
        query: { query: trimmedQuery, page: 1 },
      });
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setInputValue('');
    router.push({ pathname: '/', query: {} });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
        placeholder="What are you searching?"
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={!inputValue.trim()}
      >
        Search
      </button>
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Search;
