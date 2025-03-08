import { render, screen, fireEvent } from '@testing-library/react';
import DetailsActions from '../components/Details/DetailsActions';
import { Person } from '../utils/types';
import { vi } from 'vitest';

vi.mock('./Details', () => ({
  default: () => <div>Details Component</div>,
}));

vi.mock('../spinner/Spinner', () => ({
  default: () => <div role="progressbar">Loading...</div>,
}));

describe('DetailsActions Component', () => {
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

  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the Spinner while loading', () => {
    render(
      <DetailsActions person={mockPerson} personId="1" onClose={onCloseMock} />
    );

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('calls onClose when clicking outside the component', () => {
    render(
      <DetailsActions person={mockPerson} personId="1" onClose={onCloseMock} />
    );

    fireEvent.mouseDown(document.body);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the close button', () => {
    render(
      <DetailsActions person={mockPerson} personId="1" onClose={onCloseMock} />
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render anything when personId is null', () => {
    render(
      <DetailsActions
        person={mockPerson}
        personId={null}
        onClose={onCloseMock}
      />
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('Details Component')).not.toBeInTheDocument();
  });
});
