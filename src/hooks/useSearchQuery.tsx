import { useState, useEffect } from 'react';

const useSearchQuery = (): [string, (query: string) => void] => {
  const [query, setQuery] = useState(
    () => localStorage.getItem('searchQuery') || ''
  );

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  return [query, setQuery];
};

export default useSearchQuery;
