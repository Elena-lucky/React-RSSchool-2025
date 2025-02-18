import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person } from '../../utils/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getPerson: builder.query({
      query: ({ query = '', page }) => `/people/?search=${query}&page=${page}`,
    }),
    getPersonById: builder.query<Person, string>({
      query: (id) => `/people/${id}/`,
    }),
  }),
});

export const { useGetPersonQuery, useGetPersonByIdQuery } = apiSlice;
