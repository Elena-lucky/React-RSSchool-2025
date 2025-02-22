import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Oops! This page was not found.</p>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Back to Main Page
      </button>
    </div>
  );
};

export default NotFoundPage;
