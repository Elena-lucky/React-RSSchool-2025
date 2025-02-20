import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import { useGetPersonByIdQuery } from '../services/Api/apiSlice';
import { vi } from 'vitest';

vi.mock('../services/Api/apiSlice', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../services/Api/apiSlice')>();
  return {
    ...mod,
    useGetPersonByIdQuery: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  };
});

describe('DetailsPage Component', () => {
  const setup = (initialEntries = ['/people/1']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/people/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading spinner when data is loading', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({ isLoading: true });
    setup();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error('Failed to fetch'),
    });

    setup();

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it('renders person details when data is fetched', async () => {
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
      url: 'http://swapi.dev/api/people/1/',
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
    };

    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({ data: mockPerson });
    setup();

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
      expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
      expect(screen.getByText(/Hair Color: blond/i)).toBeInTheDocument();
      expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
      expect(screen.getByText(/Height: 172 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/Mass: 77 kg/i)).toBeInTheDocument();
      expect(screen.getByText(/Skin Color: fair/i)).toBeInTheDocument();
      expect(screen.getByText(/Homeworld: Tatooine/i)).toBeInTheDocument();
      expect(
        screen.getByText(/URL: http:\/\/swapi.dev\/api\/people\/1\//i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Created: 2014-12-09T13:50:51.644000Z/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Edited: 2014-12-20T21:17:56.891000Z/i)
      ).toBeInTheDocument();
    });
  });

  it('closes the details page when close button is clicked', async () => {
    const mockPerson = { name: 'Luke Skywalker' };

    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({ data: mockPerson });

    setup();

    const closeButton = screen.getByRole('button', { name: /✖/i });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('closes the details page when clicking outside the component', async () => {
    const mockPerson = { name: 'Luke Skywalker' };

    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({ data: mockPerson });

    setup();

    await userEvent.click(document.body);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
