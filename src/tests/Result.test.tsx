import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Result from '../components/result/Result';
import { Person } from '../utils/types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

const mockData = {
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
      url: 'http://swapi.dev/api/people/1/',
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
    },
    {
      name: 'Leia Organa',
      birth_year: '19BBY',
      gender: 'female',
      hair_color: 'brown',
      eye_color: 'brown',
      height: '150',
      mass: '49',
      skin_color: 'light',
      homeworld: 'Alderaan',
      url: 'http://swapi.dev/api/people/5/',
      created: '2014-12-10T15:20:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
    },
  ] as Person[],
};

const setup = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        {' '}
        {}
        <Routes>
          <Route path="/" element={<Result data={mockData} />} />
          <Route path="/people/:id" element={<div>Details Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Result Component', () => {
  it('renders the list of results', () => {
    setup();
    const birthYearElements = screen.getAllByText(/The birth year: 19BBY/i);
    expect(birthYearElements.length).toBe(2);
  });

  it('renders no results message when data is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          {' '}
          {}
          <Result data={{ results: [] }} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(/No results found. Please try another query./i)
    ).toBeInTheDocument();
  });

  it('toggles checkbox when clicked', async () => {
    setup();
    const checkboxes = screen.getAllByRole('checkbox');
    const firstCheckbox = checkboxes[0];

    await userEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    await userEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });

  it('navigates to details page when a result is clicked', async () => {
    setup();
    const link = screen.getByText(/Luke Skywalker/i);
    await userEvent.click(link);
    expect(screen.getByText(/Details Page/i)).toBeInTheDocument();
  });
});
