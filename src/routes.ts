import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  // route('/', 'routes/Result.tsx', [
  // route('people/:id', './pages/DetailsPage/DetailsPage.tsx'),]),
  route('*?', './pages/NotFoundPage/NotFoundPage.tsx'),
] satisfies RouteConfig;
