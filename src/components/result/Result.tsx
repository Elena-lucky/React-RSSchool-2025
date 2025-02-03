import styles from './Result.module.css';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  url: string;
}

interface Props {
  data: { results: Person[] } | null;
  onPersonClick: (id: string) => void;
}

const Result = ({ data, onPersonClick }: Props) => {
  return (
    <div className={styles.results}>
      {data && data.results.length > 0 ? (
        data.results.map((person) => {
          const id = person.url.split('/').slice(-2, -1)[0];
          return (
            <div
              key={id}
              className={styles.resultItem}
              onClick={() => onPersonClick(id)}
            >
              <h2 className={styles.itemName}>{person.name}</h2>
              <ul>
                <li className={styles.itemDetails}>
                  The birth of year: {person.birth_year}
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
