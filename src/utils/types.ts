export interface Person {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  url: string;
  created: string;
  edited: string;
}

export interface ApiResponse {
  results: Person[];
  count: number;
  next: string | null;
  previous: string | null;
}

export enum SearchParams {
  name = 'search',
  page = 'page',
  details = 'details',
}

export interface MainPageProps {
  apiResponse: ApiResponse | null;
  searchQuery: string;
  currentPage: number;
}
