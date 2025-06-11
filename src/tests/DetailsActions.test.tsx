import { render, screen, fireEvent } from '@testing-library/react';
import DetailsActions from '../components/Details/DetailsActions';
import { Character } from '../utils/types';
import { vi } from 'vitest';

vi.mock('./Details', () => ({
  default: () => <div>Details Component</div>,
}));

vi.mock('../spinner/Spinner', () => ({
  default: () => <div role="progressbar">Loading...</div>,
}));

describe('DetailsActions Component', () => {
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

  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls onClose when clicking outside the component', () => {
    render(
      <DetailsActions
        person={mockCharacter}
        personId="1"
        onClose={onCloseMock}
      />
    );

    fireEvent.mouseDown(document.body);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the close button', () => {
    render(
      <DetailsActions
        person={mockCharacter}
        personId="1"
        onClose={onCloseMock}
      />
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render anything when personId is null', () => {
    render(
      <DetailsActions
        person={mockCharacter}
        personId={null}
        onClose={onCloseMock}
      />
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('Details Component')).not.toBeInTheDocument();
  });
});
