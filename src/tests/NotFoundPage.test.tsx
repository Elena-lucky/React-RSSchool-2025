import { render, screen } from '@testing-library/react';
import NotFoundPage from '../app/not-found';
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

describe('NotFoundPage Component', () => {
  it('renders the "Not Found" message', () => {
    render(<NotFoundPage />);

    const message = screen.getByText('Oops! This page was not found.');
    expect(message).toBeInTheDocument();
  });

  it('renders the "Back to Main page" link', () => {
    render(<NotFoundPage />);

    const link = screen.getByRole('link', { name: /back to main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
