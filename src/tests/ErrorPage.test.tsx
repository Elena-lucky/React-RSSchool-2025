import { render, screen } from '@testing-library/react';
import ErrorPage from '../app/error';
import { vi } from 'vitest';

// Mock the next/link component
vi.mock('next/link', () => {
  return {
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => <a href={href}>{children}</a>,
  };
});

describe('ErrorPage Component', () => {
  it('renders the error message', () => {
    render(<ErrorPage />);

    // Check if the error message is rendered
    const errorMessage = screen.getByText('500 - Server-side error occurred');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ErrorPage />);

    // Check if the description is rendered
    const description = screen.getByText(
      'Sorry, something went wrong. Please try again later.'
    );
    expect(description).toBeInTheDocument();
  });

  it('renders the "Go back home" link', () => {
    render(<ErrorPage />);

    // Check if the link is rendered with the correct text and href
    const link = screen.getByRole('link', { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
