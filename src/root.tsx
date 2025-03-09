import {
  // isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/error boundary/ErrorBoundary';
import store from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import './index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="./starwars.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Star Wars API</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorBoundary>
          <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
          </Provider>
        </ErrorBoundary>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
