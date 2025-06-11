import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../components/spinner/Spinner', () => ({
  default: () => <div>Loading...</div>,
}));

describe('Pagination component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => '',
    });
  });

  it('renders current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables "Previous" on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('disables "Next" on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Previous')).not.toBeDisabled();
  });

  it('calls router.push with correct page increment (next)', () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockPush).toHaveBeenCalledWith('/?page=3');
  });

  it('calls router.push with correct page decrement (previous)', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(mockPush).toHaveBeenCalledWith('/?page=2');
  });

  it('includes search query in the URL', () => {
    render(<Pagination currentPage={1} totalPages={3} searchQuery="rick" />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockPush).toHaveBeenCalledWith('/?page=2&query=rick');
  });
});
