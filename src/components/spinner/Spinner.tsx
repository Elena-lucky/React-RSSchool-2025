import styles from './Spinnner.module.css';

const Spinner = () => {
  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className={styles.spinner}
    ></div>
  );
};
export default Spinner;
