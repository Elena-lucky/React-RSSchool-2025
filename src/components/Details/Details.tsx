import { useEffect, useRef } from 'react';
import { useGetPersonByIdQuery } from '../../services/Api/apiSlice';
import Spinner from '../spinner/Spinner';
import styles from './Details.module.css';

interface DetailsProps {
  personId: string;
  onClose: () => void;
}

const Details = ({ personId, onClose }: DetailsProps) => {
  const { data: person, isLoading, isError } = useGetPersonByIdQuery(personId);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  if (isLoading) {
    return (
      <div className={styles.results}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return <p>Oh sorry! There are some errors</p>;
  }

  if (!person) return <p>Person not found</p>;

  return (
    <div className={styles.results} ref={detailsRef}>
      <div className={styles.resultItem}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
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
