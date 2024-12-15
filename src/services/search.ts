import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/baseQuery.ts";
import {ISearch, ISearchResult} from "interfaces/search";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: createBaseQuery("search"),
  tagTypes: ["Search"],

  endpoints: (builder) => ({
    getPageByName: builder.query<ISearchResult, ISearch>({
      query: (filter) => ({
        url: "GetPageByName",
        params: filter
      }),
      providesTags: ["Search"],
    }),

    getPageByGenre: builder.query<ISearchResult, ISearch>({
      query: (filter) => ({
        url: "GetPageByGenre",
        params: filter
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const {
  useGetPageByNameQuery,
  useGetPageByGenreQuery,
} = searchApi;