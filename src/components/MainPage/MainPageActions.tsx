'use client';

import { Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import Search from '../../components/search/Search';
import Result from '../../components/result/Result';
import DetailsActions from '../../components/Details/DetailsActions';
import Pagination from '../../components/pagination/Pagination';
import Flyout from '../../components/flyout/Flyout';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MainPageProps } from '../../utils/types';
import ThemeManager from '../themeToggle/ThemeManager';
import styles from './MainPage.module.css';

const MainPageActions = ({
  searchQuery,
  currentPage,
  details,
  data,
  personDetails,
}: MainPageProps) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p className={styles.greeting}>
        Welcome to the Star Wars Universe Explorer! Dive into the galaxy far,
        far away and uncover fascinating details about your favorite Star Wars
        characters. Whether you are a Jedi, Sith, or just a curious traveler, my
        app helps you connect with the iconic personalities of this legendary
        saga. Simply type a name or last name into the search bar, and you will
        discover key facts, hidden secrets, and more about the person you are
        looking for.
      </p>
      <div className={styles.usersInput}>
        <Search searchQuery={searchQuery} />
        <ThemeManager />
      </div>
      <div className={`${styles.content}`}>
        <div className={styles.leftSection}>
          {data && data.results.length > 0 ? (
            <Suspense fallback={<Spinner />}>
              <Result
                searchQuery={searchQuery}
                currentPage={currentPage}
                data={data}
                onPersonClick={(personId) => {
                  const params = new URLSearchParams({
                    query: searchQuery,
                    page: currentPage.toString(),
                    details: personId,
                  });
                  router.push(`/?${params.toString()}`);
                }}
              />
            </Suspense>
          ) : (
            <p>No results found</p>
          )}
        </div>
        {details && (
          <div className={styles.rightSection}>
            <Suspense fallback={<Spinner />}>
              <DetailsActions
                person={personDetails}
                personId={details}
                onClose={() => {
                  const params = new URLSearchParams({
                    query: searchQuery,
                    page: currentPage.toString(),
                  });
                  router.push(`/?${params.toString()}`);
                }}
              />
            </Suspense>
          </div>
        )}
      </div>
      {data && data.count > 0 && (
        <Pagination
          currentPage={currentPage}
          hasPrevious={!!data.previous}
          hasNext={!!data.next}
          searchQuery={searchQuery}
        />
      )}
      <Flyout />
    </div>
  );
};

export default MainPageActions;
