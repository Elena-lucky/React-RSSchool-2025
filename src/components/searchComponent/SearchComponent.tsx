import { SearchProps } from '../../utils/types';

export const SearchComponent = ({
  searchQuery,
  onSearchChange,
}: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      aria-label="Search for a country"
    />
  );
};
