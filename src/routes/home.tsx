import type { Route } from './+types/home';
import { ApiResponse, Person } from '../utils/types';
import MainPage from '../pages/MainPage/MainPage';
import { getPersons, getPersonById } from '../services/Api/getData';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('query') || '';
  const currentPage = parseInt(url.searchParams.get('page') || '1', 10);
  const details = url.searchParams.get('details') || null;

  const data: ApiResponse = await getPersons(
    searchQuery,
    currentPage.toString()
  );
  const personDetails: Person | null = details
    ? await getPersonById(details)
    : null;

  return { searchQuery, currentPage, details, data, personDetails };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { searchQuery, currentPage, details, data, personDetails } = loaderData;

  return (
    <MainPage
      searchQuery={searchQuery}
      currentPage={currentPage}
      details={details}
      data={data}
      personDetails={personDetails}
    />
  );
}
