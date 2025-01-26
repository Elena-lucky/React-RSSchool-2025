import { Component } from 'react';
import styles from './Result.module.css';

interface Film {
  title: string;
  opening_crawl: string;
}

interface Props {
  data: { results: Film[] } | null;
}

class Result extends Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className={styles.results}>
        {data && data.results.length > 0 ? (
          data.results.map((film, index) => (
            <div key={index} className={styles.resultItem}>
              <h3>{film.title}</h3>
              <p>{film.opening_crawl}</p>
            </div>
          ))
        ) : (
          <p>No results found. Please try another query.</p>
        )}
      </div>
    );
  }
}

export default Result;
