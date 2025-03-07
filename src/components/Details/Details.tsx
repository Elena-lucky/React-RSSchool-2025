import { Person } from '../../utils/types';
import Spinner from '../spinner/Spinner';
import styles from './Details.module.css';

interface DetailsProps {
  person: Person | null;
}

const Details = ({ person }: DetailsProps) => {
  if (!person) {
    return <Spinner />;
  }

  return (
    <div className={styles.results}>
      <div className={styles.resultItem}>
        <h2 className={styles.itemName}>{person.name}</h2>
        <ul>
          <li className={styles.itemDetails}>
            Birth Year: {person.birth_year}
          </li>
          <li className={styles.itemDetails}>Gender: {person.gender}</li>
          <li className={styles.itemDetails}>
            Hair Color: {person.hair_color}
          </li>
          <li className={styles.itemDetails}>Eye Color: {person.eye_color}</li>
          <li className={styles.itemDetails}>Height: {person.height} cm</li>
          <li className={styles.itemDetails}>Mass: {person.mass} kg</li>
          <li className={styles.itemDetails}>
            Skin Color: {person.skin_color}
          </li>
          <li className={styles.itemDetails}>Homeworld: {person.homeworld}</li>
          <li className={styles.itemDetails}>URL: {person.url}</li>
          <li className={styles.itemDetails}>Created: {person.created}</li>
          <li className={styles.itemDetails}>Edited: {person.edited}</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
