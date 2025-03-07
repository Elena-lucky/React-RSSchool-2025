'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../spinner/Spinner';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  searchQuery?: string;
}

function Pagination({
  currentPage,
  hasPrevious,
  hasNext,
  searchQuery = '',
}: PaginationProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);

    setTimeout(() => {
      const queryParams = new URLSearchParams({
        page: newPage.toString(),
        query: searchQuery,
      });
      router.push(`/?${queryParams.toString()}`);
      setIsLoading(false);
    }, 7000);
  };

  return (
    <div className={styles.pagination} aria-label="navigation">
      {isLoading && <Spinner />}
      <button
        disabled={!hasPrevious || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        disabled={!hasNext || isLoading}
        aria-label="Next"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
