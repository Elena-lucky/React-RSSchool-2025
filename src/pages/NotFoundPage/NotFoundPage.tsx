import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFoundContainer}>
      <p className={styles.notFoundMessage}>Oops! This page was not found.</p>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Back to Main Page
      </button>
    </div>
  );
};

export default NotFoundPage;
