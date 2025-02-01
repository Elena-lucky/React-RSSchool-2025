import { useState } from 'react';

const Fallback = () => {
  const [throwError, setThrowError] = useState(false);

  const handleThrowError = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('My Error Boundary component is working!');
  }

  return <button onClick={handleThrowError}>Check the Error Boundary</button>;
};

export default Fallback;
