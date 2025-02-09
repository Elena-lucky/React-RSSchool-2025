import { useState, useEffect } from 'react';

const useSearchQuery = (): [string, (query: string) => void, () => void] => {
  const [query, setQuery] = useState(
    () => localStorage.getItem('searchQuery') || ''
  );

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  const resetQuery = () => {
    setQuery('');
    localStorage.removeItem('searchQuery');
  };

  return [query, setQuery, resetQuery];
};

export default useSearchQuery;
