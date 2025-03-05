import { useRouter } from 'next/router';
import styles from '../styles/404.module.css';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className={styles.notFoundWrapper}>
      <p>Oops! This page was not found.</p>
      <button
        onClick={() => {
          void router.push('/');
        }}
      >
        Back to Main Page
      </button>
    </div>
  );
};

export default NotFoundPage;
