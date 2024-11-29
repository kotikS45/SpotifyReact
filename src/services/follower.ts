import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/baseQuery.ts";
import {IArtistFilter, IArtistsResponse} from "interfaces/artist";

export const followerApi = createApi({
    reducerPath: "followerApi",
    baseQuery: createBaseQuery("Follower"),
    tagTypes: ["Follower"],

    endpoints: (builder) => ({
        getFollowers: builder.query<IArtistsResponse, IArtistFilter>({
            query: (filter) => ({
                url: "GetPage",
                params: filter
            }),
            providesTags: ["Follower"],
        }),

        follow: builder.mutation<void, number>({
            query: (artistId) => ({
                url: `Follow/${artistId}`,
                method: "POST",
            }),
            invalidatesTags: ["Follower"],
        }),

        unfollow: builder.mutation<void, number>({
            query: (artistId) => ({
                url: `Unfollow/${artistId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Follower"],
        }),
    }),
});

export const {
    useGetFollowersQuery,
    useFollowMutation,
    useUnfollowMutation,
} = followerApi;