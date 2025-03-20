import { useState, useEffect } from 'react';
import { CountryType } from '../types/types';
import { fetchCountries } from '../api/fetchCountries';

export const useCountries = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { countries, loading, error };
};
