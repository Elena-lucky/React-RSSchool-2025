'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../spinner/Spinner';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
}

function Pagination({
  currentPage,
  totalPages,
  searchQuery = '',
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || isLoading) return;
    setIsLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    if (searchQuery) {
      params.set('query', searchQuery);
    }

    router.push(`/?${params.toString()}`);
    setIsLoading(false);
  };

  return (
    <div
      className={styles.pagination}
      aria-label="navigation"
      data-testid="pagination"
    >
      {isLoading && <Spinner />}
      <button
        disabled={currentPage <= 1 || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
