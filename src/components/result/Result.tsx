import { Component } from 'react';
import styles from './Result.module.css';

interface Props {
  result: { name: string; description: string } | null;
}

class Result extends Component<Props> {
  render() {
    const { result } = this.props;

    return (
      <div className={styles.results}>
        {result ? (
          <div>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ) : (
          <p>
            Type your query and press the button &aposSearch&apos to see the
            result.
          </p>
        )}
      </div>
    );
  }
}

export default Result;
