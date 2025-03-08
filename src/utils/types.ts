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
  searchQuery: string;
  currentPage: number;
  details: string | null;
  data: ApiResponse;
  personDetails: Person | null;
}
export interface ResultProps {
  searchQuery: string;
  currentPage: number;
  data: ApiResponse;
  onPersonClick: (personId: string) => void;
}
