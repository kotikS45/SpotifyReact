import { IArtist } from "../../../../../reacr3/SpotifyReact/src/interfaces/artist";

export interface IAlbum {
  id: number;
  releaseDate: Date;
  name: string;
  image: string;
  artist: IArtist;
}