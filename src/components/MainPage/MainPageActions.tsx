'use client';

import clsx from 'clsx';
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
        Welcome to the Rick and Morty Universe Explorer! Step into a multiverse
        of bizarre adventures and discover fascinating details about your
        favorite Rick and Morty characters. Whether you are a mad scientist, a
        curious Morty, or just a fan of interdimensional chaos, this app lets
        you explore the unique personalities from the show. Simply type a name
        into the search bar to uncover key facts. You can also mark your
        favorite characters and download detailed information about them to keep
        or share.
      </p>
      <div className={styles.usersInput}>
        <Search searchQuery={searchQuery} />
        <ThemeManager />
      </div>
      <div className={`${styles.content}`}>
        <div
          className={clsx(styles.leftSection, {
            [styles.leftSectionHidden]: details,
          })}
        >
          {data && data.results && data.results.length > 0 ? (
            <Suspense fallback={<Spinner />}>
              <Result
                searchQuery={searchQuery}
                currentPage={currentPage}
                data={data}
                onPersonClick={(personId) => {
                  const params = new URLSearchParams({
                    query: searchQuery,
                    page: currentPage.toString(),
                    details: personId.toString(),
                  });
                  router.push(`/?${params.toString()}`);
                }}
              />
            </Suspense>
          ) : (
            <p className={styles.noResults}>No results found</p>
          )}
        </div>
        {details && (
          <div
            className={clsx(styles.rightSection, {
              [styles.rightSectionFull]: details,
            })}
          >
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
      {data && data.info && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.info.pages}
          searchQuery={searchQuery}
          data-testid="pagination"
        />
      )}
      <Flyout />
    </div>
  );
};

export default MainPageActions;
