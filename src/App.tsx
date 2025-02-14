import Router from './routing/Router';
import ErrorBoundary from './components/error boundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import store from './store/store';
import { Provider } from 'react-redux';
import './App.css';

console.log('Current Redux Store:', store.getState());
const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
