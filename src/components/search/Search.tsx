'use client';

import { useState, useRef, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '../spinner/Spinner';
import styles from './Search.module.css';

type SearchProps = {
  searchQuery?: string;
};

const Search = ({ searchQuery = '' }: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('query', trimmedQuery);
      params.set('page', '1');

      startTransition(() => {
        router.push(`/?${params.toString()}`);
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
    const params = new URLSearchParams(searchParams.toString());
    params.delete('query');
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.searchField} data-testid="search-component">
      <input
        className={styles.searchInput}
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
        disabled={!inputValue.trim() || isPending}
      >
        {isPending ? 'Searching...' : 'Search'}
      </button>
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
      {isPending && <Spinner />}
    </div>
  );
};

export default Search;
