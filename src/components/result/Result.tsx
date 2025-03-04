import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Person } from '../../utils/types';
import Checkbox from '../../components/checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../store/selectedItemsSlice';
import { useGetPersonQuery } from '../../services/Api/apiSlice';
import { RootState } from '../../store/store';
import styles from './Result.module.css';

interface Props {
  searchQuery: string;
  currentPage: number;
  onPersonClick: (personId: string) => void;
}

const Result = forwardRef<HTMLUListElement, Props>(function Result(
  { searchQuery, currentPage, onPersonClick },
  listRef
): ReactNode {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const {
    data: apiResponse,
    isSuccess,
    isError,
  } = useGetPersonQuery({
    query: searchQuery,
    page: currentPage,
  });

  const handleCheckboxChange = (person: Person) => {
    dispatch(toggleItem(person));
  };

  if (!isSuccess) {
    return <p className={styles.noResults}>Loading...</p>;
  }

  if (isError) {
    return <p className={styles.error}>Oh sorry! There are some errors</p>;
  }

  if (
    !apiResponse ||
    !apiResponse.results ||
    apiResponse.results.length === 0
  ) {
    return (
      <p className={styles.noResults}>
        No results found. Please try another query.
      </p>
    );
  }

  return (
    <div className={styles.results}>
      {apiResponse.results.map((person) => {
        const personId = person.url.match(/\/(\d+)\/$/)?.[1] || '';

        return (
          <div key={personId} className={styles.resultItemWrapper}>
            <div
              className={styles.resultItem}
              onClick={() => onPersonClick(personId)}
            >
              <h2 className={styles.itemName}>{person.name}</h2>
              <ul ref={listRef}>
                <li className={styles.itemDetails}>
                  The birth year: {person.birth_year}
                </li>
                <li className={styles.itemDetails}>
                  The gender: {person.gender}
                </li>
                <li className={styles.itemDetails}>
                  The hair color: {person.hair_color}
                </li>
                <li className={styles.itemDetails}>
                  The eye color: {person.eye_color}
                </li>
              </ul>
            </div>
            <Checkbox
              checked={selectedItems.some((item) => item.url === person.url)}
              onChange={() => handleCheckboxChange(person)}
            />
          </div>
        );
      })}
    </div>
  );
});

export default Result;
