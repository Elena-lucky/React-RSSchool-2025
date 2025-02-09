import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Result from '../components/result/Result';
import { Person } from '../utils/types';

describe('Result Component', () => {
  const mockData: { results: Person[] } = {
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
        homeworld: 'https://swapi.dev/api/planets/1/',
        url: 'https://swapi.dev/api/people/1/',
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
        homeworld: 'https://swapi.dev/api/planets/2/',
        url: 'https://swapi.dev/api/people/5/',
        created: '2014-12-10T15:20:09.791000Z',
        edited: '2014-12-20T21:17:50.315000Z',
      },
    ],
  };

  afterEach(cleanup);

  it('should render the specified number of cards', () => {
    render(
      <MemoryRouter>
        <Result data={mockData} />
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(mockData.results.length);

    mockData.results.forEach((person) => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(
        screen.getByText(`The gender: ${person.gender}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`The hair color: ${person.hair_color}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`The eye color: ${person.eye_color}`)
      ).toBeInTheDocument();
    });
  });

  it('should display a message if no cards are present', () => {
    render(
      <MemoryRouter>
        <Result data={{ results: [] }} />
      </MemoryRouter>
    );

    const noResults = screen.getAllByText(
      /No results found. Please try another query./i
    );
    expect(noResults.length).toBeGreaterThan(0);

    render(
      <MemoryRouter>
        <Result data={null} />
      </MemoryRouter>
    );

    const noResultsAgain = screen.getAllByText(
      /No results found. Please try another query./i
    );
    expect(noResultsAgain.length).toBeGreaterThan(0);
  });
});
