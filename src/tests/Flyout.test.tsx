import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../components/flyout/Flyout';
import selectedItemsReducer from '../store/selectedItemsSlice';
import { vi } from 'vitest';
import { Person } from '../utils/types';

global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

describe('Flyout Component', () => {
  const mockSelectedItems: Person[] = [
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
      url: 'http://swapi.dev/api/people/1/',
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
  ];

  const setup = (
    initialState: { selectedItems: Person[] } = { selectedItems: [] }
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
    expect(screen.queryByText(/person is selected/i)).not.toBeInTheDocument();
  });

  it('renders when selectedItems is not empty', () => {
    setup({ selectedItems: mockSelectedItems });
    expect(screen.getByText(/2 persons are selected/i)).toBeInTheDocument();
  });

  it('displays correct text for single selected item', () => {
    setup({ selectedItems: [mockSelectedItems[0]] });
    expect(screen.getByText(/1 person is selected/i)).toBeInTheDocument();
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
