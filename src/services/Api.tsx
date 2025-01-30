const API_URL = 'https://swapi.dev/api/';

export async function fetchSearchResults(query: string, page: number = 1) {
  try {
    const url = query
      ? `${API_URL}/people/?search=${query}&page=${page}`
      : `${API_URL}/people/?page=${page}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
