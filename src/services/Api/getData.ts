import { ApiResponse, Person } from '../../utils/types';

export async function getPersons(
  searchQuery: string,
  page: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getPersonById(details: string): Promise<Person> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${details}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
