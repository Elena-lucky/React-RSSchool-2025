import { Component } from 'react';
import styles from './Result.module.css';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
}

interface Props {
  data: { results: Person[] } | null;
}

class Result extends Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className={styles.results}>
        {data && data.results.length > 0 ? (
          data.results.map((person, index) => (
            <div key={index} className={styles.resultItem}>
              <h3>{person.name}</h3>
              <p>The birth of year: {person.birth_year}</p>
              <p>The gender: {person.gender}</p>
              <p>The hair color: {person.hair_color}</p>
              <p>The eye color: {person.eye_color}</p>
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
