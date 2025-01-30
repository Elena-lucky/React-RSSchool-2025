import React, { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface PropsEB {
  children: ReactNode;
}

interface StateEB {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<PropsEB, StateEB> {
  constructor(props: PropsEB) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): StateEB {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorMessage: error.message });
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 className={styles.error}>Something went wrong.</h1>
          {this.state.errorMessage && (
            <p className={styles.errorMessage}>{this.state.errorMessage}</p>
          )}
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
