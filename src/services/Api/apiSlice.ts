import type {
  CombinedState,
  EndpointDefinitions,
} from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Action, PayloadAction } from '@reduxjs/toolkit/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ApiResponse, Person, SearchParams } from '../../utils/types';
import type { RootState } from '../../store/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export interface PersonsQueryParams {
  query: string;
  page?: number;
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getPerson: builder.query<ApiResponse, PersonsQueryParams>({
      query: ({ query = '', page = 1 }: PersonsQueryParams) => {
        const searchParams = new URLSearchParams({
          [SearchParams.page]: page.toString(),
          [SearchParams.name]: query,
        });
        return `people/?${searchParams.toString()}`;
      },
    }),
    getPersonById: builder.query<Person, string>({
      query: (id) => `/people/${id}/`,
    }),
  }),
  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, string, 'api'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }

    return undefined;
  },
});

export const {
  useGetPersonQuery,
  useGetPersonByIdQuery,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getPerson, getPersonById } = apiSlice.endpoints;
