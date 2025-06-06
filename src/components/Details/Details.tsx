import Image from 'next/image';
import { Character } from '../../utils/types';
import Spinner from '../spinner/Spinner';
import styles from './Details.module.css';

interface DetailsProps {
  person: Character | null;
}

const Details = ({ person }: DetailsProps) => {
  if (!person) {
    return <Spinner />;
  }

  return (
    <div className={styles.results}>
      <div className={styles.resultItem}>
        <Image
          width={200}
          height={200}
          className={styles.itemImg}
          src={person.image}
          alt={person.name}
        />
        <h2 className={styles.itemName}>{person.name}</h2>
        <ul>
          <li className={styles.itemDetails}>Status: {person.status}</li>
          <li className={styles.itemDetails}>Species: {person.species}</li>
          <li className={styles.itemDetails}>Type: {person.type}</li>
          <li className={styles.itemDetails}>Gender: {person.gender}</li>
          <li className={styles.itemDetails}>URL: {person.url}</li>
          <li className={styles.itemDetails}>Created: {person.created}</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
