import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from '../pages/404';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('NotFoundPage Component', () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the 404 message and button', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByText(/Oops! This page was not found./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Back to Main Page/i })
    ).toBeInTheDocument();
  });

  it('navigates to the home page when the button is clicked', () => {
    render(<NotFoundPage />);

    const button = screen.getByRole('button', { name: /Back to Main Page/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
