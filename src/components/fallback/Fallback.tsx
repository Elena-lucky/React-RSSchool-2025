import { Component } from 'react';

class Fallback extends Component {
  state = {
    throwError: false,
  };

  handleThrowError = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('My Error Boundary component is working!');
    }

    return (
      <button onClick={this.handleThrowError}>Check the Error Boundary</button>
    );
  }
}

export default Fallback;
