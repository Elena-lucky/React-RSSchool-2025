import { render, screen } from '@testing-library/react';
import Details from '../components/Details/Details';
import { Person } from '../utils/types';

describe('Details Component', () => {
  it('renders the Spinner when person is null', () => {
    render(<Details person={null} />);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('renders person details when person data is provided', () => {
    const mockPerson: Person = {
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
    };

    render(<Details person={mockPerson} />);

    expect(screen.getByText(mockPerson.name)).toBeInTheDocument();

    expect(
      screen.getByText(`Birth Year: ${mockPerson.birth_year}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockPerson.gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Hair Color: ${mockPerson.hair_color}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Eye Color: ${mockPerson.eye_color}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Height: ${mockPerson.height} cm`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${mockPerson.mass} kg`)).toBeInTheDocument();
    expect(
      screen.getByText(`Skin Color: ${mockPerson.skin_color}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Homeworld: ${mockPerson.homeworld}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`URL: ${mockPerson.url}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Created: ${mockPerson.created}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Edited: ${mockPerson.edited}`)
    ).toBeInTheDocument();
  });
});
