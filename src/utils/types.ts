export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  origin: string;
  location: string;
  image: string;
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
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
  personDetails: Character | null;
}
export interface ResultProps {
  searchQuery: string;
  currentPage: number;
  data: ApiResponse;
  onPersonClick: (personId: number) => void;
}
