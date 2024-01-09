import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import Company from "./features/companies/interfaces/company";
import localCompanies from "./companies.json";

const localDataQuery: BaseQueryFn<string, unknown, unknown> = async () => {
  return { data: localCompanies };
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: localDataQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:8080/" }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => "companies",
    }),
  }),
});

// FYI: The `useGetCompaniesQuery` hook is generated automatically by Redux
// Toolkit's RTK Query when you define an endpoint in the createApi call.
// Refer to: https://redux-toolkit.js.org/rtk-query/api/createApi
export const { useGetCompaniesQuery } = api;
