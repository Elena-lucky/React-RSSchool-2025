import { SortProps } from '../../utils/types';
import styles from './SortComponent.module.css';

export const SortComponent = ({
  sortBy,
  sortOrder,
  onSortChange,
}: SortProps) => {
  return (
    <div className={styles.sortContainer}>
      <select
        value={sortBy}
        onChange={(e) =>
          onSortChange(e.target.value as 'population' | 'name', sortOrder)
        }
        aria-label="Sort by"
      >
        <option value="population">Population</option>
        <option value="name">Name</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(sortBy, e.target.value as 'asc' | 'desc')}
        aria-label="Sort order"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
