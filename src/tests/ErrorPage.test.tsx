import { render, screen } from '@testing-library/react';
import ErrorPage from '../app/error';
import { vi } from 'vitest';

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

    const errorMessage = screen.getByText('500 - Server-side error occurred');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ErrorPage />);

    const description = screen.getByText(
      'Sorry, something went wrong. Please try again later.'
    );
    expect(description).toBeInTheDocument();
  });

  it('renders the "Go back home" link', () => {
    render(<ErrorPage />);

    const link = screen.getByRole('link', { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
