import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPageChange: (newPage: number) => void;
}

function Pagination({
  currentPage,
  hasPrevious,
  hasNext,
  onPageChange,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button disabled={!hasNext} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
