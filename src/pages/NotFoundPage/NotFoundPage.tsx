import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <p>Oops! This page was not found.</p>
      <Link to="/">Back to Main Page</Link>
    </div>
  );
};

export default NotFoundPage;
