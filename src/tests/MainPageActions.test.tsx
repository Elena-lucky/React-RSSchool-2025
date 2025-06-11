import { render, screen } from '@testing-library/react';
import MainPageActions from '../components/MainPage/MainPageActions';
import { MainPageProps } from '../utils/types';
import { vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../components/search/Search', () => ({
  default: vi.fn(() => (
    <div>
      <input placeholder="What are you searching?" type="text" value="Luke" />
      <button>Search</button>
      <button>Reset</button>
    </div>
  )),
}));

vi.mock('../themeToggle/ThemeManager', () => ({
  default: vi.fn(() => <div>ThemeManager Component</div>),
}));

vi.mock('../../components/result/Result', () => ({
  default: vi.fn(() => <div>Result Component</div>),
}));

vi.mock('../../components/Details/DetailsActions', () => ({
  default: vi.fn(() => <div>DetailsActions Component</div>),
}));

vi.mock('../../components/pagination/Pagination', () => ({
  default: vi.fn(() => <div>Pagination Component</div>),
}));

vi.mock('../spinner/Spinner', () => ({
  default: vi.fn(() => <div>Spinner Component</div>),
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

vi.mock('../../context/ThemeContext', async () => {
  const actual = await vi.importActual('../../context/ThemeContext');
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      theme: 'light',
      toggleTheme: vi.fn(),
    })),
  };
});

const mockStore = configureStore({
  reducer: {
    selectedItems: () => ({ selectedItems: [] }),
  },
});

describe('MainPageActions Component', () => {
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

  it('renders the greeting message', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MainPageActions {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    const greeting = screen.getByText(
      /Welcome to the Rick and Morty Universe Explorer!/i
    );
    expect(greeting).toBeInTheDocument();
  });

  it('renders the Search component', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MainPageActions {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });

  it('renders the Result component when data is available', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MainPageActions {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('result-component')).toBeInTheDocument();
  });

  it('renders the Pagination component when there are multiple pages', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MainPageActions {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('renders "No results found" when there is no data', () => {
    const noDataProps: MainPageProps = {
      ...mockProps,
      data: {
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [],
      },
    };

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MainPageActions {...noDataProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
