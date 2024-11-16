export interface IPlaylistTrackFilter {
  PageIndex?: number;
  PageSize?: number;
  SearchTerm?: string;
  ArtistId?: number;
  AlbumId?: number;
  PlaylistId: number;
}

export interface IPlaylistTrackCreate {
  PlaylistId: number;
  TrackId: number;
}

export interface IPlaylistTrackDelete {
  PlaylistId: number;
  TrackId: number;
}