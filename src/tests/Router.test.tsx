import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../routing/Router';

describe('Router', () => {
  it('should render NotFoundPage for an unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-path']}>
        <Router />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/oops! this page was not found/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /back to main page/i })
    ).toBeInTheDocument();
  });

  it('should render MainPage for the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Welcome to the Star Wars Universe Explorer/i)
    ).toBeInTheDocument();
  });
});
