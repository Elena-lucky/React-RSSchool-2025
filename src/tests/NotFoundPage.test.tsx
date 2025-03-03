import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../pages/404';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('NotFoundPage Component', () => {
  it('should render the "Not Found" message and a button', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<NotFoundPage />);

    const message = screen.getByText('Oops! This page was not found.');
    expect(message).toBeInTheDocument();

    const button = screen.getByText('Back to Main Page');
    expect(button).toBeInTheDocument();
  });

  it('should navigate to the home page when the button is clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<NotFoundPage />);

    const button = screen.getByText('Back to Main Page');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
