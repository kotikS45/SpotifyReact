export interface IPlaylist {
  id: number,
  name: string,
  image: string
}

export interface IPlaylistCreate {
  name: string,
  image: File
}

export interface IPlaylistUpdate {
  id: number,
  name: string,
  image: File
}