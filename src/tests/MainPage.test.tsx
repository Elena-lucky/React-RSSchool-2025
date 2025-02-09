import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MainPage from '../pages/MainPage/MainPage';
import { fetchSearchResults } from '../services/Api';

vi.mock('../services/Api', () => ({
  fetchSearchResults: vi.fn(),
}));

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component and its main elements', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Welcome to the Star Wars Universe Explorer!/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/What are you searching?/i)
    ).toBeInTheDocument();

    const searchButtons = screen.getAllByText(/Search/i);
    expect(searchButtons[0]).toBeInTheDocument();
  });

  it('should display error message if API request fails', async () => {
    vi.mocked(fetchSearchResults).mockRejectedValue(
      new Error('Failed to fetch')
    );

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Please try again./i)).toBeInTheDocument();
    });
  });
});
