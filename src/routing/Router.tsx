import MainPage from '../pages/MainPage/MainPage';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="people/:id" element={<DetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
