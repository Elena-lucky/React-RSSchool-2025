import React from 'react';
import Search from './components/search/Search';
import Result from './components/result/Result';
import { fetchSearchResults } from './services/Api';
import './App.css';

class App extends React.Component {
  state = {
    query: '',
    result: null,
    error: null,
  };

  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch = async (query: string) => {
    this.setState({ query, error: null });

    try {
      const result = await fetchSearchResults(query);
      this.setState({ result });
    } catch {
      this.setState({ error: 'Please try again.' });
    }
  };

  render() {
    const { result, error } = this.state;

    return (
      <div>
        <Search onSearchClick={this.handleSearch} />
        {error && <p className="error">{error}</p>}
        {result && <Result data={result} />}
      </div>
    );
  }
}

export default App;
