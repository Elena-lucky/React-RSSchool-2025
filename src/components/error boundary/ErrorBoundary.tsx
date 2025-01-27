import React, { Component, ReactNode } from 'react';

interface PropsEB {
  children: ReactNode;
}

interface StateEB {
  hasError: boolean;
}

class ErrorBoundary extends Component<PropsEB, StateEB> {
  constructor(props: PropsEB) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): StateEB {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
