import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
  index('./home.tsx'),
  route('/people/:id', './pages/DetailsPage/DetailsPage.tsx'),
  route('*?', './pages/NotFoundPage/NotFoundPage.tsx'),
] satisfies RouteConfig;
