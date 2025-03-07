import Link from 'next/link';
import styles from '../styles/404.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundWrapper}>
      <p>Oops! This page was not found.</p>
      <Link href="/">Back to Main page</Link>
    </div>
  );
}
