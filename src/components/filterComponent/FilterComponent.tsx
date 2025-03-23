import React from 'react';
import { FilterProps } from '../../types/types';

export const FilterComponent = React.memo(
  ({ selectedRegion, onRegionChange }: FilterProps) => {
    const regions = [
      'All regions',
      'Africa',
      'Americas',
      'Antarctic',
      'Asia',
      'Europe',
      'Oceania',
    ];

    return (
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        aria-label="Filter by region"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    );
  }
);

FilterComponent.displayName = 'FilterComponent';
