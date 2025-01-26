import React from 'react';
import Search from './components/search/Search';
import Result from './components/result/Result';
import Spinner from './components/spinner/Spinner';
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
      <div>
        <Search onSearchClick={this.handleSearch} />
        {isLoading && <Spinner />} {}
        {error && <p className="error">{error}</p>}
        {result && <Result data={result} />}
      </div>
    );
  }
}

export default App;
