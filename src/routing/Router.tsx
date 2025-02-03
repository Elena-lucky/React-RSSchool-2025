import MainPage from '../pages/MainPage/MainPage';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

const DetailsPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return id ? <DetailsPage id={id} onClose={handleClose} /> : null;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="person/:id" element={<DetailsPageWrapper />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
