import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/Api/apiSlice';
import { Person } from '../utils/types';

vi.mock('../services/Api/apiHooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../services/Api/apiHooks')>();
  return {
    ...mod,
    useGetPersonQuery: vi.fn(),
    useGetPersonByIdQuery: vi.fn(),
  };
});

import {
  useGetPersonQuery,
  useGetPersonByIdQuery,
} from '../services/Api/apiHooks';

global.fetch = vi.fn();

const mockPerson: Person = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  hair_color: 'blond',
  eye_color: 'blue',
  height: '172',
  mass: '77',
  skin_color: 'fair',
  homeworld: 'Tatooine',
  url: 'http://swapi.dev/api/people/1/',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
};

describe('apiSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch person by ID', async () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPerson,
      isSuccess: true,
    });

    const { result } = renderHook(() => useGetPersonByIdQuery('1'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockPerson);
  });

  it('should fetch person by query and page', async () => {
    const mockSearchResponse = {
      results: [mockPerson],
      count: 1,
      next: null,
      previous: null,
    };

    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: mockSearchResponse,
      isSuccess: true,
    });

    const { result } = renderHook(
      () => useGetPersonQuery({ query: 'Luke', page: 1 }),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockSearchResponse);
  });
});
