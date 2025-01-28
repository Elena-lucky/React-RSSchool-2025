import React from 'react';
import Search from './components/search/Search';
import Result from './components/result/Result';
import Spinner from './components/spinner/Spinner';
import ErrorBoundary from './components/error boundary/ErrorBoundary';
import Fallback from './components/fallback/Fallback';
import { fetchSearchResults } from './services/Api';
import './App.css';

class App extends React.Component {
  state = {
    query: '',
    result: null,
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch = async (query: string) => {
    this.setState({ query, error: null, isLoading: true });

    try {
      const result = await fetchSearchResults(query);
      this.setState({ result, isLoading: false });
    } catch {
      this.setState({ error: 'Please try again.', isLoading: false });
    }
  };

  render() {
    const { result, error, isLoading } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <p className="greeting">
            Welcome to the Star Wars Universe Explorer! Dive into the galaxy
            far, far away and uncover fascinating details about your favorite
            Star Wars characters. Whether you are a Jedi, Sith, or just a
            curious traveler, my app helps you connect with the iconic
            personalities of this legendary saga. Simply type a name or last
            name into the search bar, and you will discover key facts, hidden
            secrets, and more about the person you are looking for.
          </p>
          <Search onSearchClick={this.handleSearch} />
          {isLoading && <Spinner />} {}
          {error && <p>{error}</p>}
          {result && <Result data={result} />}
          <Fallback />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
