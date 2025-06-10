import { ApiResponse, Character } from '../../utils/types';

export async function getAllCharacters(
  name: string,
  page: string
): Promise<ApiResponse | null> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
    );

    if (response.status === 404) {
      return null;
    }

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

export async function getCharacter(id: string): Promise<Character> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
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
