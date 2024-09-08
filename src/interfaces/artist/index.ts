export interface IArtist {
  id: number,
  name: string,
  image: string
}

export interface IArtistCreate {
  name: string,
  image: File
}

export interface IArtistUpdate {
  id: number,
  name: string,
  image: File
}