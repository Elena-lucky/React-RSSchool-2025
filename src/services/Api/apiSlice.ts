import type {
  CombinedState,
  EndpointDefinitions,
} from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Action, PayloadAction } from '@reduxjs/toolkit/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ApiResponse, Character, SearchParams } from '../../utils/types';
import type { RootState } from '../../store/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export interface PersonsQueryParams {
  query: string;
  page?: number;
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ApiResponse, PersonsQueryParams>({
      query: ({ query = '', page = 1 }: PersonsQueryParams) => {
        const searchParams = new URLSearchParams({
          [SearchParams.page]: page.toString(),
          [SearchParams.name]: query,
        });
        return `character/?${searchParams.toString()}`;
      },
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => `/character/${id}`,
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
  useGetAllCharactersQuery,
  useGetCharacterQuery,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getAllCharacters, getCharacter } = apiSlice.endpoints;
