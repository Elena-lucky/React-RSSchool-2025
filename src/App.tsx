import React from 'react';
import Search from './components/search/Search';
import Result from './components/result/Result';
import './App.css';

class App extends React.Component {
  state = {
    query: '',
    result: null,
  };

  handleSearch = (query: string) => {
    this.setState({ query });

    const fakeResult = {
      name: 'Name',
      description: 'Description',
    };

    this.setState({ result: fakeResult });
  };

  render() {
    const { result } = this.state;

    return (
      <div>
        <Search onSearchClick={this.handleSearch} />
        <Result result={result} />
      </div>
    );
  }
}

export default App;
