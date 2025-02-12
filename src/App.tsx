import Router from './routing/Router';
import ErrorBoundary from './components/error boundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
