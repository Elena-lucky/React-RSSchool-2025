import { Suspense } from 'react';
import MainPage from '../components/MainPage/MainPage';
import Spinner from '../components/spinner/Spinner';
import { getPersons, getPersonById } from '../services/Api/getData';

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function Home({
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const searchQuery =
    typeof searchParams?.query === 'string' ? searchParams.query : '';
  const currentPage =
    typeof searchParams?.page === 'string'
      ? parseInt(searchParams.page, 10) || 1
      : 1;
  const details =
    typeof searchParams?.details === 'string' ? searchParams.details : null;

  const data = await getPersons(searchQuery, currentPage.toString());
  const personDetails = details ? await getPersonById(details) : null;

  return (
    <Suspense
      key={`${searchQuery}-${currentPage}-${details}`}
      fallback={<Spinner />}
    >
      <MainPage
        searchQuery={searchQuery}
        currentPage={currentPage}
        details={details}
        data={data}
        personDetails={personDetails}
      />
    </Suspense>
  );
}
