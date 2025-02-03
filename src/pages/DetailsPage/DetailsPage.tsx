import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import styles from './DetailsPage.module.css';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  url: string;
  created: string;
  edited: string;
}

interface Props {
  id: string;
  onClose: () => void;
}

const DetailsPage = ({ id, onClose }: Props) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadPerson = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const personData: Person = await response.json();
        setPerson(personData);
      } catch (error) {
        console.error('Error fetching person details:', error);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    loadPerson();
  }, [id]);

  const handleClose = useCallback(() => {
    searchParams.delete('details');
    setSearchParams(searchParams);
    onClose();
  }, [searchParams, setSearchParams, onClose]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.${styles.resultItem}`)) {
        handleClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleClose]);

  if (loading) {
    return (
      <div className={styles.results}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }
  if (!person) return <p>Person not found</p>;

  return (
    <div className={styles.results}>
      <div className={styles.resultItem}>
        <button className={styles.closeButton} onClick={handleClose}>
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

export default DetailsPage;
