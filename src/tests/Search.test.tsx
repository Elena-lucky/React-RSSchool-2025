import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/search/Search';
import { useRouter, useSearchParams } from 'next/navigation';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock the Spinner component
vi.mock('../spinner/Spinner', () => ({
  default: () => <div role="progressbar">Loading...</div>,
}));

describe('Search Component', () => {
  const mockPush = vi.fn();
  const mockGet = vi.fn();
  const mockToString = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
      toString: mockToString.mockReturnValue(''),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the input and buttons correctly', () => {
    render(<Search searchQuery="Luke" />);

    const input = screen.getByPlaceholderText('What are you searching?');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Luke');

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });

  it('calls handleSearch when the search button is clicked', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('What are you searching?');
    fireEvent.change(input, { target: { value: 'Leia' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    vi.advanceTimersByTime(7000);

    expect(mockPush).toHaveBeenCalledWith('/?query=Leia&page=1');
  });

  it('calls handleSearch when pressing Enter', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('What are you searching?');
    fireEvent.change(input, { target: { value: 'Leia' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    vi.advanceTimersByTime(7000);

    expect(mockPush).toHaveBeenCalledWith('/?query=Leia&page=1');
  });

  it('calls handleReset when the reset button is clicked', () => {
    render(<Search searchQuery="Luke" />);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    const input = screen.getByPlaceholderText('What are you searching?');
    expect(input).toHaveValue('');

    expect(mockPush).toHaveBeenCalledWith('/?');
  });

  it('disables the search button when the input is empty', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('What are you searching?');
    const searchButton = screen.getByRole('button', { name: /search/i });

    expect(searchButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Leia' } });

    expect(searchButton).not.toBeDisabled();
  });
});
