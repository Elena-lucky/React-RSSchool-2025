import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../components/flyout/Flyout';
import selectedItemsReducer from '../store/selectedItemsSlice';
import { vi } from 'vitest';
import { Character } from '../utils/types';

global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

describe('Flyout Component', () => {
  const mockSelectedItems: Character[] = [
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
  ];

  const setup = (
    initialState: { selectedItems: Character[] } = { selectedItems: [] }
  ) => {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: initialState,
      },
    });

    return render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
  };

  it('does not render when selectedItems is empty', () => {
    setup();
    expect(
      screen.queryByText(/character is selected/i)
    ).not.toBeInTheDocument();
  });

  it('renders when selectedItems is not empty', () => {
    setup({ selectedItems: mockSelectedItems });
    expect(screen.getByText(/2 characters are selected/i)).toBeInTheDocument();
  });

  it('displays correct text for single selected item', () => {
    setup({ selectedItems: [mockSelectedItems[0]] });
    expect(screen.getByText(/1 character is selected/i)).toBeInTheDocument();
  });

  it('calls clearSelectedItems when "Unselect all" button is clicked', () => {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: { selectedItems: mockSelectedItems },
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectButton = screen.getByText(/Unselect all/i);
    fireEvent.click(unselectButton);

    const state = store.getState().selectedItems;
    expect(state.selectedItems).toHaveLength(0);
  });
  it('creates and downloads CSV file when "Download" button is clicked', () => {
    setup({ selectedItems: mockSelectedItems });

    const downloadButton = screen.getByText(/Download/i);
    fireEvent.click(downloadButton);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    const downloadLink = screen.getByRole('link', { hidden: true });
    expect(downloadLink).toHaveAttribute(
      'download',
      `${mockSelectedItems.length}_persons.csv`
    );
  });
});
