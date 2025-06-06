import type { Metadata } from 'next';
import StoreProvider from '../store/storeProvider';
import { ThemeProvider } from '../context/ThemeContext';
import ErrorBoundary from '../components/error boundary/ErrorBoundary';
import './global.css';

export const metadata: Metadata = {
  title: 'Rick and Morty API',
  description: 'Rick and Morty API is a trainee project for React course',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <StoreProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
