import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Details from '../components/Details/Details';
import { useGetPersonByIdQuery } from '../services/Api/apiSlice';
import { vi } from 'vitest';

vi.mock('../services/Api/apiSlice', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../services/Api/apiSlice')>();
  return {
    ...mod,
    useGetPersonByIdQuery: vi.fn(),
  };
});

describe('Details Component', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays a spinner while loading', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<Details personId="1" onClose={onCloseMock} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<Details personId="1" onClose={onCloseMock} />);
    expect(
      screen.getByText(/Oh sorry! There are some errors/i)
    ).toBeInTheDocument();
  });

  it('displays "Person not found" when no data is returned', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(<Details personId="1" onClose={onCloseMock} />);
    expect(screen.getByText(/Person not found/i)).toBeInTheDocument();
  });

  it('displays person details when data is successfully loaded', async () => {
    const mockPerson = {
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

    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isError: false,
    });

    render(<Details personId="1" onClose={onCloseMock} />);

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

  it('calls onClose when clicking outside the component', async () => {
    const mockPerson = {
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

    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isError: false,
    });

    render(<Details personId="1" onClose={onCloseMock} />);

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call onClose when clicking inside the component', async () => {
    const mockPerson = {
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

    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isError: false,
    });

    render(<Details personId="1" onClose={onCloseMock} />);

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.mouseDown(closeButton);

    await waitFor(() => {
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });
});
