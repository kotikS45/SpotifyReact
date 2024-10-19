import { IGenre } from "interfaces/genre";

export interface ITrack {
  id: number,
  duration: number,
  albumId: number,
  artistId: number,
  albumName: string,
  artistName: string,
  name: string,
  path: string,
  image: string,
  genres: IGenre[],
}

export interface ITrackCreate {
  albumId: number,
  name: string,
  track: File,
  image: File,
  genres: IGenre[],
}

export interface ITrackUpdate {
  id: number,
  albumId: number,
  name: string,
  track: File,
  image: File,
  genres: IGenre[],
}