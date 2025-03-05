import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'; // Import Vitest utilities
import MainPage from '../pages/index';
import { useGetPersonQuery } from '../services/Api/apiSlice';
import { apiSlice } from '../services/Api/apiSlice';
import { ThemeProvider } from '../context/ThemeContext';
import selectedItemsReducer from '../store/selectedItemsSlice';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../services/Api/apiSlice', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../services/Api/apiSlice')>();
  return {
    ...mod,
    useGetPersonQuery: vi.fn(),
  };
});

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

describe('MainPage', () => {
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {},
      push: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    });

    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the greeting message', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage searchQuery="" currentPage={1} details={null} />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByText(
        /Welcome to the Star Wars Universe Explorer! Dive into the galaxy far, far away and uncover fascinating details about your favorite Star Wars characters./i
      )
    ).toBeInTheDocument();
  });

  it('renders the Search component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage searchQuery="" currentPage={1} details={null} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the ThemeToggle component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage searchQuery="" currentPage={1} details={null} />
        </ThemeProvider>
      </Provider>
    );

    const themeToggle = screen.getByRole('checkbox', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('renders the Spinner when loading', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: {
        results: [{ id: '1', name: 'Luke Skywalker' }],
        count: 1,
        previous: null,
        next: '2',
      },
      isLoading: true,
      isError: false,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage searchQuery="Luke" currentPage={1} details={'1'} />
        </ThemeProvider>
      </Provider>
    );

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('renders "No results found" when there is no data', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isError: false,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage searchQuery="" currentPage={1} details={null} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
