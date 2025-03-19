import { VisitedCountryProps } from '../../utils/types';
import styles from './VisitedCountries.module.css';

export const VisitedCountry = ({
  countryName,
  onToggle,
  isChecked,
}: VisitedCountryProps) => {
  const handleCheckboxChange = () => {
    onToggle(!isChecked);
  };

  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id={`cbx-${countryName}`}
        className={styles.inpCbx}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`cbx-${countryName}`} className={styles.cbx}>
        <span>Visited</span>
      </label>
    </div>
  );
};
