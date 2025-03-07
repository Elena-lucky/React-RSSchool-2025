import { render, screen } from '@testing-library/react';
import ErrorPage from '../app/500';
import { vi } from 'vitest';

vi.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  return { default: MockLink };
});

describe('ErrorPage Component', () => {
  it('renders the 500 error message and link', () => {
    render(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: /500 - Server-side error occurred/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, something went wrong. Please try again later./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Go back home/i })
    ).toBeInTheDocument();
  });

  it('navigates to the home page when the link is clicked', () => {
    render(<ErrorPage />);

    const link = screen.getByRole('link', { name: /Go back home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
