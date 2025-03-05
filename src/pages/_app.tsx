import ErrorBoundary from '../components/error boundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeContext';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import '../styles/index.css';

export default function App({ Component, pageProps }: AppProps): ReactNode {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Head>
        <title>Star Wars API</title>
        <meta
          name="description"
          content="Star Wars API is a trainee project for React course"
        />
        <link rel="icon" type="image/svg+xml" href="/starwars.svg" />
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
