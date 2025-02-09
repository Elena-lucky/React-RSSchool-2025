import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import DetailsPage from '../pages/DetailsPage/DetailsPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const server = setupServer(
  http.get('https://swapi.dev/api/people/:id', () => {
    return HttpResponse.json({
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
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DetailsPage', () => {
  it('should render person details after fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/person/1']}>
        <Routes>
          <Route path="person/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77 kg/i)).toBeInTheDocument();
  });

  it('should show "Person not found" if API returns an error', async () => {
    server.use(
      http.get('https://swapi.dev/api/people/:id', () => {
        return HttpResponse.json(null, { status: 404 });
      })
    );

    render(
      <MemoryRouter initialEntries={['/person/999']}>
        <Routes>
          <Route path="person/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Person not found/i)).toBeInTheDocument()
    );
  });

  it('should navigate to main page when close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/person/1']}>
        <Routes>
          <Route path="person/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument()
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
