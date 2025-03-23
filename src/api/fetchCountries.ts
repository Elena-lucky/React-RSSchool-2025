import { CountryType } from '../types/types';

export async function fetchCountries(): Promise<CountryType[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Oh sorry! Something went wrong.');
    }
    const data = await response.json();
    const countries: CountryType[] = data.map((country: CountryType) => ({
      name: { common: country.name.common },
      region: country.region,
      population: country.population,
      flags: { png: country.flags.png },
    }));

    return countries;
  } catch (err) {
    console.error('Error fetching countries:', err);
    throw new Error('Failed to fetch countries');
  }
}
