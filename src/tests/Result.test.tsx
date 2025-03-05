import { render, screen, fireEvent } from '@testing-library/react';
import Result from '../components/result/Result';
import { useGetPersonQuery } from '../services/Api/apiSlice';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';

vi.mock('../services/Api/apiSlice', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../services/Api/apiSlice')>();
  return {
    ...mod,
    useGetPersonQuery: vi.fn(),
  };
});

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

describe('Result Component', () => {
  const onPersonClickMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays a loading message while fetching data', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isSuccess: false,
      isError: false,
      isLoading: true,
    });

    render(
      <Provider store={mockStore}>
        <Result
          searchQuery="Luke"
          currentPage={1}
          onPersonClick={onPersonClickMock}
        />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays "No results found" when no data is returned', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      isSuccess: true,
      isError: false,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <Result
          searchQuery="Luke"
          currentPage={1}
          onPersonClick={onPersonClickMock}
        />
      </Provider>
    );

    expect(
      screen.getByText(/No results found. Please try another query./i)
    ).toBeInTheDocument();
  });

  it('displays person details when data is successfully loaded', () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          hair_color: 'blond',
          eye_color: 'blue',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };

    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isSuccess: true,
      isError: false,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <Result
          searchQuery="Luke"
          currentPage={1}
          onPersonClick={onPersonClickMock}
        />
      </Provider>
    );

    expect(screen.getByText(mockData.results[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(`The birth year: ${mockData.results[0].birth_year}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`The gender: ${mockData.results[0].gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`The hair color: ${mockData.results[0].hair_color}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`The eye color: ${mockData.results[0].eye_color}`)
    ).toBeInTheDocument();
  });

  it('calls onPersonClick when a person item is clicked', () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          hair_color: 'blond',
          eye_color: 'blue',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };

    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isSuccess: true,
      isError: false,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <Result
          searchQuery="Luke"
          currentPage={1}
          onPersonClick={onPersonClickMock}
        />
      </Provider>
    );

    const personItem = screen.getByText(mockData.results[0].name);
    fireEvent.click(personItem);

    expect(onPersonClickMock).toHaveBeenCalledWith('1');
  });

  it('toggles the checkbox when clicked', () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          hair_color: 'blond',
          eye_color: 'blue',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };

    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isSuccess: true,
      isError: false,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <Result
          searchQuery="Luke"
          currentPage={1}
          onPersonClick={onPersonClickMock}
        />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
