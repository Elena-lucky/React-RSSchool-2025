import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import { useGetPersonQuery } from '../services/Api/apiSlice';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import store from '../store/store';

vi.mock('../services/Api/apiSlice', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../services/Api/apiSlice')>();
  return {
    ...mod,
    useGetPersonQuery: vi.fn(),
  };
});

describe('MainPage Component', () => {
  const setup = (initialEntries = ['/']) => {
    return render(
      <Provider store={store}>
        {' '}
        {}
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/people/:id" element={<div>Details Page</div>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });
  });

  it('renders the greeting message', () => {
    setup();
    expect(
      screen.getByText(/Welcome to the Star Wars Universe Explorer!/i)
    ).toBeInTheDocument();
  });

  it('toggles theme when theme toggle is clicked', async () => {
    setup();

    const themeToggle = screen.getByRole('checkbox');
    userEvent.click(themeToggle);
    await waitFor(() => expect(themeToggle).toBeChecked());
  });

  it('updates search query on search', async () => {
    setup();

    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.type(searchInput, 'Luke');
    expect(searchInput).toHaveValue('Luke');
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(useGetPersonQuery as jest.Mock).toHaveBeenCalledWith({
        query: 'Luke',
        page: 1,
      });
    });
  });

  it('displays loading spinner when fetching data', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({ isLoading: true });
    setup();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message on fetch error', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error('Failed to fetch'),
    });

    setup();

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it('navigates to details page when a result is clicked', async () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'Luke Skywalker', url: 'http://swapi.dev/api/people/1/' },
        ],
        count: 1,
      },
    });
    setup();
    userEvent.click(screen.getByText(/Luke Skywalker/i));
    await waitFor(() =>
      expect(screen.getByText(/Details Page/i)).toBeInTheDocument()
    );
  });
});
