import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Result from '../components/result/Result';
import { ApiResponse } from '../utils/types';
import { vi } from 'vitest';

vi.mock('../../components/checkbox/CheckboxManager', () => ({
  default: () => <div>CheckboxManager Component</div>,
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: () => ({ selectedItems: [] }),
  },
});

describe('Result Component', () => {
  const mockData: ApiResponse = {
    count: 2,
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
      {
        name: 'Leia Organa',
        birth_year: '19BBY',
        gender: 'female',
        hair_color: 'blond',
        eye_color: 'brown',
        height: '150',
        mass: '49',
        skin_color: 'fair',
        homeworld: 'Alderaan',
        url: 'http://swapi.dev/api/people/5/',
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
      },
    ],
  };

  const onPersonClickMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the list of persons correctly', () => {
    render(
      <Provider store={mockStore}>
        <Result
          data={mockData}
          onPersonClick={onPersonClickMock}
          searchQuery="Luke"
          currentPage={1}
        />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();

    const birthYearElements = screen.getAllByText(/The birth year:/i);
    expect(birthYearElements.length).toBe(2);

    const genderElements = screen.getAllByText(/The gender:/i);
    expect(genderElements.length).toBe(2);

    const hairColorElements = screen.getAllByText(/The hair color:/i);
    expect(hairColorElements.length).toBe(2);

    const eyeColorElements = screen.getAllByText(/The eye color:/i);
    expect(eyeColorElements.length).toBe(2);
  });

  it('calls onPersonClick when a person item is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Result
          data={mockData}
          onPersonClick={onPersonClickMock}
          searchQuery="Luke"
          currentPage={1}
        />
      </Provider>
    );

    const personItem = screen.getByText('Luke Skywalker').closest('div');
    if (personItem) {
      fireEvent.click(personItem);
    }

    expect(onPersonClickMock).toHaveBeenCalledWith('1');
  });

  it('renders the CheckboxManager component for each person', () => {
    render(
      <Provider store={mockStore}>
        <Result
          data={mockData}
          onPersonClick={onPersonClickMock}
          searchQuery="Luke"
          currentPage={1}
        />
      </Provider>
    );

    const checkboxManagers = screen.getAllByRole('checkbox');
    expect(checkboxManagers.length).toBe(mockData.results.length);
  });
});
