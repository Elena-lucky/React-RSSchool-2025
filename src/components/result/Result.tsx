import { Person } from '../../utils/types';
import Checkbox from '../../components/checkbox/Checkbox';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import styles from './Result.module.css';

interface Props {
  data: { results: Person[] } | null;
}

const Result = ({ data }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleCheckboxChange = (person: Person) => {
    dispatch(toggleItem(person));
  };

  return (
    <div className={styles.results}>
      {data?.results.length ? (
        data.results.map((person) => {
          const personId = person.url.match(/\/(\d+)\/$/)?.[1] || '';

          return (
            <div key={personId} className={styles.resultItemWrapper}>
              <Link
                to={`people/${personId}`}
                state={{ from: location, currentPage }}
                className={styles.resultItem}
              >
                <h2 className={styles.itemName}>{person.name}</h2>
                <ul>
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
              </Link>
              <Checkbox
                checked={selectedItems.some((item) => item.url === person.url)}
                onChange={() => handleCheckboxChange(person)}
              />
            </div>
          );
        })
      ) : (
        <p className={styles.noResults}>
          No results found. Please try another query.
        </p>
      )}
    </div>
  );
};

export default Result;
