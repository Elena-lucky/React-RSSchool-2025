import { Suspense } from 'react';
import MainPage from '../components/MainPage/MainPage';
import Spinner from '../components/spinner/Spinner';
import { getAllCharacters, getCharacter } from '../services/Api/getData';

interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const searchQuery =
    typeof searchParams?.query === 'string' ? searchParams.query : '';
  const currentPage =
    typeof searchParams?.page === 'string'
      ? parseInt(searchParams.page, 10) || 1
      : 1;
  const details =
    typeof searchParams?.details === 'string' ? searchParams.details : null;

  const data = await getAllCharacters(searchQuery, currentPage.toString());
  const personDetails = details ? await getCharacter(details) : null;

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
