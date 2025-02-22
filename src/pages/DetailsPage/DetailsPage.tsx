import { useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPersonByIdQuery } from '../../services/Api/apiSlice';
import Spinner from '../../components/spinner/Spinner';
import styles from './DetailsPage.module.css';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const {
    data: person,
    isLoading,
    isError,
    error,
  } = useGetPersonByIdQuery(id || '', {
    skip: !id,
  });

  const handleClose = useCallback(() => {
    navigate(-1);
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
    return <p>Error: {error.toString()}</p>;
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
