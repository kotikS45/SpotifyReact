import { createApi } from "@reduxjs/toolkit/query/react";
import {IPlaylistTrackCreate, IPlaylistTrackDelete, IPlaylistTrackFilter} from "interfaces/playlistTrack";
import {ITrack, ITracksResponse} from "interfaces/track";
import { createBaseQuery } from "utils/baseQuery.ts";

export const playlistTracksApi = createApi({
  reducerPath: "PlaylistTracksApi",
  baseQuery: createBaseQuery("PlaylistTracks"),
  tagTypes: ["PlaylistTracks"],

  endpoints: (builder) => ({
    getTracks: builder.query<ITracksResponse, IPlaylistTrackFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter,
      }),
      providesTags: ["PlaylistTracks"],
    }),
    getTracksById: builder.query<ITrack[], number>({
      query: (id) => ({
        url: `GetById/${id}`,
      }),
      providesTags: ["PlaylistTracks"],
    }),
    createTrack: builder.mutation<void, IPlaylistTrackCreate>({
      query: (data) => {
        const formData = new FormData();
        formData.append("PlaylistId", data.PlaylistId.toString());
        formData.append("TrackId", data.TrackId.toString());

        return {
          url: "Create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["PlaylistTracks"],
    }),
    deleteTrack: builder.mutation<void, IPlaylistTrackDelete>({
      query: (data) => {
        const formData = new FormData();
        formData.append("PlaylistId", data.PlaylistId.toString());
        formData.append("TrackId", data.TrackId.toString());

        return {
          url: "Delete",
          method: "DELETE",
          body: formData,
        };
      },
      invalidatesTags: ["PlaylistTracks"],
    }),
  }),
});

export const {
    useGetTracksQuery,
    useCreateTrackMutation,
    useDeleteTrackMutation,
    useGetTracksByIdQuery
} = playlistTracksApi;
