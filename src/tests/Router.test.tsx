import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import Router from '../routing/Router';
import store from '../store/store';

describe('Router', () => {
  it('should render NotFoundPage for an unknown path', () => {
    render(
      <Provider store={store}>
        {' '}
        {}
        <ThemeProvider>
          <MemoryRouter initialEntries={['/unknown-path']}>
            <Router />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
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
      <Provider store={store}>
        {' '}
        {}
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Router />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByText(/Welcome to the Star Wars Universe Explorer/i)
    ).toBeInTheDocument();
  });
});
