import { Person, ResultProps } from '../../utils/types';
import CheckboxManager from '../../components/checkbox/CheckboxManager';
import styles from './Result.module.css';

const Result = ({ data, onPersonClick }: ResultProps) => {
  return (
    <div className={styles.results}>
      {data.results.map((person: Person) => {
        const personId = person.url.match(/\/(\d+)\/$/)?.[1] || '';
        return (
          <div key={personId} className={styles.resultItemWrapper}>
            <div
              className={styles.resultItem}
              onClick={() => onPersonClick(personId)}
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
            </div>
            <CheckboxManager person={person} />
          </div>
        );
      })}
    </div>
  );
};

export default Result;
