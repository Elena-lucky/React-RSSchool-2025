'use client';

import { useState, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery) {
      setIsLoading(true);
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('query', trimmedQuery);
        params.set('page', '1');
        router.push(`/?${params.toString()}`);
        setIsLoading(false);
      }, 7000);
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
        disabled={!inputValue.trim() || isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
      {isLoading && <Spinner />}
    </div>
  );
};

export default Search;
