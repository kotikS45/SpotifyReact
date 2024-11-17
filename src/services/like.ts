import { createApi } from "@reduxjs/toolkit/query/react";
import { ITracksResponse, ITrackFilter } from "interfaces/track";
import { createBaseQuery } from "utils/baseQuery.ts";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: createBaseQuery("likes"),
  tagTypes: ["Likes"],

  endpoints: (builder) => ({
    getLikes: builder.query<ITracksResponse, ITrackFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter
      }),
      providesTags: ["Likes"],
    }),

    like: builder.mutation<void, number>({
      query: (trackId) => ({
        url: `Like/${trackId}`,
        method: "POST",
      }),
      invalidatesTags: ["Likes"],
    }),

    unlike: builder.mutation<void, number>({
      query: (trackId) => ({
        url: `Unlike/${trackId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Likes"],
    }),
  }),
});

export const {
  useGetLikesQuery,
  useLikeMutation,
  useUnlikeMutation,
} = likeApi;