import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/search/Search';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Search Component', () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {},
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search input and buttons', () => {
    render(<Search />);

    expect(
      screen.getByPlaceholderText(/What are you searching?/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  it('updates the input value when the user types', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/What are you searching?/i);
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input).toHaveValue('Luke');
  });

  it('calls handleSearch when the search button is clicked', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/What are you searching?/i);
    fireEvent.change(input, { target: { value: 'Luke' } });

    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: { query: 'Luke', page: 1 },
    });
  });

  it('calls handleSearch when the Enter key is pressed', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/What are you searching?/i);
    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: { query: 'Luke', page: 1 },
    });
  });

  it('calls handleReset when the reset button is clicked', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/What are you searching?/i);
    fireEvent.change(input, { target: { value: 'Luke' } });

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);

    expect(input).toHaveValue('');
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: {},
    });
  });

  it('disables the search button when the input is empty', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/What are you searching?/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    expect(searchButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Luke' } });
    expect(searchButton).not.toBeDisabled();

    fireEvent.change(input, { target: { value: '' } });
    expect(searchButton).toBeDisabled();
  });
});
