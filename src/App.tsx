import Router from './routing/Router';
import ErrorBoundary from './components/error boundary/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
