import { useEffect, useCallback, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Person } from '../../utils/types';
import Spinner from '../../components/spinner/Spinner';
import styles from './DetailsPage.module.css';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
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
    <div className={styles.results} ref={detailsRef}>
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
