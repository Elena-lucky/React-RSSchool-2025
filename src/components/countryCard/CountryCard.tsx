import { useState, useEffect } from 'react';
import { CountryCardProps } from '../../types/types';
import { VisitedCountry } from '../visitedCountries/VisitedCountries';
import styles from './CountryCard.module.css';

export const CountryCard = ({ country }: CountryCardProps) => {
  const [isVisited, setIsVisited] = useState<boolean>(false);

  useEffect(() => {
    const visitedCountries = JSON.parse(
      localStorage.getItem('visitedCountries') || '{}'
    );
    setIsVisited(!!visitedCountries[country.name.common]);
  }, [country.name.common]);

  const handleToggleVisited = (isChecked: boolean) => {
    const visitedCountries = JSON.parse(
      localStorage.getItem('visitedCountries') || '{}'
    );

    let updatedVisitedCountries;
    if (isChecked) {
      updatedVisitedCountries = {
        ...visitedCountries,
        [country.name.common]: true,
      };
    } else {
      const { [country.name.common]: _, ...rest } = visitedCountries;
      void _;
      updatedVisitedCountries = rest;
    }

    localStorage.setItem(
      'visitedCountries',
      JSON.stringify(updatedVisitedCountries)
    );
    setIsVisited(isChecked);
  };

  return (
    <li className={styles.item}>
      <div className={`${styles.flipCard} ${isVisited ? styles.visited : ''}`}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className={styles.imgFlag}
            />
            <h2>{country.name.common}</h2>
          </div>
          <div className={styles.flipCardBack}>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
          </div>
        </div>
      </div>
      <VisitedCountry
        countryName={country.name.common}
        onToggle={handleToggleVisited}
        isChecked={isVisited}
      />
    </li>
  );
};
