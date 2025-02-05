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
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { results: [], count: 0, next: null, previous: null };
  }
}
