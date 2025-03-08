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
    searchQuery: 'Luke',
    currentPage: 1,
    details: '1',
    data: {
      count: 1,
      next: 'https://swapi.dev/api/people/?page=2',
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          hair_color: 'blond',
          eye_color: 'blue',
          height: '172',
          mass: '77',
          skin_color: 'fair',
          homeworld: 'Tatooine',
          url: 'http://example.com/people/1/',
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
        },
      ],
    },
    personDetails: {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      hair_color: 'blond',
      eye_color: 'blue',
      height: '172',
      mass: '77',
      skin_color: 'fair',
      homeworld: 'Tatooine',
      url: 'https://swapi.dev/api/people/1/',
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
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
