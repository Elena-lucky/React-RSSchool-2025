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
    info: {
      count: 2,
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
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: 'Earth (C-137)',
        location: 'Citadel of Ricks',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        url: 'https://rickandmortyapi.com/api/character/2',
        created: '2017-11-04T18:50:21.651Z',
      },
    ],
  };

  const onPersonClickMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the list of characters correctly', () => {
    render(
      <Provider store={mockStore}>
        <Result
          data={mockData}
          onPersonClick={onPersonClickMock}
          searchQuery="Rick"
          currentPage={1}
        />
      </Provider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('calls onPersonClick when a character item is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Result
          data={mockData}
          onPersonClick={onPersonClickMock}
          searchQuery="Rick"
          currentPage={1}
        />
      </Provider>
    );

    const characterItem = screen.getByText('Rick Sanchez').closest('div');
    if (characterItem) {
      fireEvent.click(characterItem);
    }

    expect(onPersonClickMock).toHaveBeenCalledWith(1);
  });

  it('renders the CheckboxManager component for each character', () => {
    render(
      <Provider store={mockStore}>
        <Result
          data={mockData}
          onPersonClick={onPersonClickMock}
          searchQuery="Rick"
          currentPage={1}
        />
      </Provider>
    );

    const checkboxManagers = screen.getAllByRole('checkbox');
    expect(checkboxManagers.length).toBe(mockData.results.length);
  });
});
