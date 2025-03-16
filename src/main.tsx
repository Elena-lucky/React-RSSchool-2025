import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './errorBoundary/ErrorBoundary.tsx';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found.');
}
