import { type ReactNode } from 'react';
import MainPageActions from '../MainPage/MainPageActions';
import { MainPageProps } from '../../utils/types';

const MainPage = ({
  searchQuery,
  currentPage,
  details,
  data,
  personDetails,
}: MainPageProps): ReactNode => {
  return (
    <MainPageActions
      searchQuery={searchQuery}
      currentPage={currentPage}
      details={details}
      data={data}
      personDetails={personDetails}
    />
  );
};

export default MainPage;
