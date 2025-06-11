import { render } from '@testing-library/react';
import MainPage from '../components/MainPage/MainPage';
import MainPageActions from '../components/MainPage/MainPageActions';
import { MainPageProps } from '../utils/types';
import { ThemeProvider } from '../context/ThemeContext';
import { vi } from 'vitest';

vi.mock('../components/MainPage/MainPageActions', () => ({
  default: vi.fn(() => <div>MainPageActions Component</div>),
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
      toString: vi.fn(),
    })),
  };
});

vi.mock('../context/ThemeContext', async () => {
  const actual = await vi.importActual('../context/ThemeContext');
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      theme: 'light',
      toggleTheme: vi.fn(),
    })),
  };
});

describe('MainPage Component', () => {
  const mockProps: MainPageProps = {
    searchQuery: 'Rick',
    currentPage: 1,
    details: '1',
    data: {
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: 'Earth (C-137)',
          location: 'Citadel of Ricks',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    },
    personDetails: {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: 'Earth (C-137)',
      location: 'Citadel of Ricks',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the MainPageActions component with correct props', () => {
    render(
      <ThemeProvider>
        <MainPage {...mockProps} />
      </ThemeProvider>
    );

    expect(MainPageActions).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: mockProps.searchQuery,
        currentPage: mockProps.currentPage,
        details: mockProps.details,
        data: mockProps.data,
        personDetails: mockProps.personDetails,
      }),
      expect.anything()
    );
  });
});
