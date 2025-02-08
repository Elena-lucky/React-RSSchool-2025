import { Person } from '../../utils/types';
import { Link } from 'react-router-dom';
import styles from './Result.module.css';

interface Props {
  data: { results: Person[] } | null;
}

const Result = ({ data }: Props) => {
  return (
    <div className={styles.results}>
      {data?.results.length ? (
        data.results.map((person) => {
          const personId = person.url.match(/\/(\d+)\/$/)?.[1] || '';

          return (
            <Link
              key={personId}
              to={`person/${personId}`}
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
