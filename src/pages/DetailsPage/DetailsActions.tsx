import { useEffect, useRef, useState } from 'react';
import { Person } from '../../utils/types';
import Details from './DetailsPage';
import Spinner from '../../components/spinner/Spinner';
import styles from './DetailsPage.module.css';

interface DetailsActionsProps {
  person: Person | null;
  personId: string | null;
  onClose: () => void;
}

const DetailsActions = ({ person, personId, onClose }: DetailsActionsProps) => {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!personId) return null;

  return (
    <div className={styles.results} ref={detailsRef}>
      {isLoading ? (
        <Spinner />
      ) : person ? (
        <Details person={person} />
      ) : (
        <p>No person details available</p>
      )}
      <button className={styles.closeButton} onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default DetailsActions;
