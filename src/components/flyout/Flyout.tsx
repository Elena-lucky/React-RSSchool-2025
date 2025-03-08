'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItems } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import { Person } from '../../utils/types';
import styles from './Flyout.module.css';

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems as Person[]
  );

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

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
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedItems.length}_persons.csv`;
      downloadLinkRef.current.click();
    }

    URL.revokeObjectURL(url);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div aria-label="Flyout" className={styles.outer}>
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
      <a
        ref={downloadLinkRef}
        style={{ display: 'none' }}
        aria-label="Download link"
      ></a>
    </div>
  );
};

export default Flyout;
