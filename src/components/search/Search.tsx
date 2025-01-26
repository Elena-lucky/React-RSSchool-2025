import { Component } from 'react';
import styles from './Search.module.css';

type SearchProps = {
  onSearchClick: (query: string) => void;
};

type UsersQuery = {
  query: string;
};

class Search extends Component<SearchProps, UsersQuery> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    this.setState({ query: '' });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const query = this.state.query.trim();
    if (query) {
      localStorage.setItem('searchQuery', query);
      this.props.onSearchClick(query);
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="What are you searching?"
        />
        <button
          className={styles.searchButton}
          onClick={this.handleSearch}
          disabled={!this.state.query.trim()}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
