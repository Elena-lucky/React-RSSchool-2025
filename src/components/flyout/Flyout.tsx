import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItems } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import styles from './Flyout.module.css';

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const handleDownload = () => {
    if (selectedItems.length === 0) return;

    const delimiter = ';';
    const headers = [
      'Name',
      'Birth Year',
      'Gender',
      'Height',
      'Mass',
      'Eye Color',
      'Homeworld',
      'URL',
    ];

    const csvRows = selectedItems.map((person) =>
      [
        person.name,
        person.birth_year,
        person.gender,
        person.height,
        person.mass,
        person.eye_color,
        person.homeworld,
        person.url,
      ]
        .map((value) => `"${value}"`)
        .join(delimiter)
    );

    const csvContent =
      '\uFEFF' + [headers.join(delimiter), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItems.length}_persons.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className={styles.outer}>
      <div className={styles.dot}></div>
      <div className={styles.card}>
        <div className={styles.ray}></div>
        <div className={styles.text}>
          {selectedItems.length}{' '}
          {selectedItems.length === 1 ? 'person is' : 'persons are'} selected
        </div>
        <div className={styles.buttons}>
          <button onClick={() => dispatch(clearSelectedItems())}>
            Unselect all
          </button>
          <button onClick={handleDownload}>Download</button>
        </div>
        <div className={clsx(styles.line, styles.topl)}></div>
        <div className={clsx(styles.line, styles.leftl)}></div>
        <div className={clsx(styles.line, styles.bottoml)}></div>
        <div className={clsx(styles.line, styles.rightl)}></div>
      </div>
    </div>
  );
};

export default Flyout;
