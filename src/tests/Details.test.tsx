import { render, screen } from '@testing-library/react';
import Details from '../components/Details/Details';
import { Character } from '../utils/types';

describe('Details Component', () => {
  it('renders the Spinner when person is null', () => {
    render(<Details person={null} />);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('renders character details when character data is provided', () => {
    const mockCharacter: Character = {
      id: 361,
      name: 'Toxic Rick',
      status: 'Dead',
      species: 'Humanoid',
      gender: 'Male',
      type: "Rick's Toxic Side",
      origin: 'Alien Spa',
      location: 'Earth',
      image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
      url: 'https://rickandmortyapi.com/api/character/361',
      created: '2018-01-10T18:20:41.703Z',
    };

    render(<Details person={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Status: ${mockCharacter.status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Species: ${mockCharacter.species}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockCharacter.gender}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Type: ${mockCharacter.type}`)).toBeInTheDocument();
    expect(screen.getByText(`URL: ${mockCharacter.url}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Created: ${mockCharacter.created}`)
    ).toBeInTheDocument();
  });
});
