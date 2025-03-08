import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../spinner/Spinner', () => ({
  default: vi.fn(() => <div>Loading...</div>),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();
  const mockRouter = { push: mockPush };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the Pagination component with correct buttons and page number', () => {
    render(
      <Pagination
        currentPage={2}
        hasPrevious={true}
        hasNext={true}
        searchQuery="test"
      />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  it('disables the Previous button when there is no previous page', () => {
    render(
      <Pagination
        currentPage={1}
        hasPrevious={false}
        hasNext={true}
        searchQuery="test"
      />
    );

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables the Next button when there is no next page', () => {
    render(
      <Pagination
        currentPage={5}
        hasPrevious={true}
        hasNext={false}
        searchQuery="test"
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('navigates to the previous page when the Previous button is clicked', async () => {
    vi.useFakeTimers();

    render(
      <Pagination
        currentPage={2}
        hasPrevious={true}
        hasNext={true}
        searchQuery="test"
      />
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    expect(previousButton).toBeDisabled();
    vi.advanceTimersByTime(7000);
    expect(mockPush).toHaveBeenCalledWith('/?page=1&query=test');
    vi.useRealTimers();
  });

  it('navigates to the next page when the Next button is clicked', async () => {
    vi.useFakeTimers();

    render(
      <Pagination
        currentPage={2}
        hasPrevious={true}
        hasNext={true}
        searchQuery="test"
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
    vi.advanceTimersByTime(7000);
    expect(mockPush).toHaveBeenCalledWith('/?page=3&query=test');
    vi.useRealTimers();
  });

  it('does not navigate when buttons are clicked during loading', async () => {
    vi.useFakeTimers();

    render(
      <Pagination
        currentPage={2}
        hasPrevious={true}
        hasNext={true}
        searchQuery="test"
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
    fireEvent.click(nextButton);
    vi.advanceTimersByTime(7000);
    expect(mockPush).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
