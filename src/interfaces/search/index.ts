import {IArtist} from "interfaces/artist";
import {IAlbum} from "interfaces/album";
import {ITrack} from "interfaces/track";
import {IPlaylist} from "interfaces/playlist";

export interface ISearch {
    search?: string;
    genreId?: number;
    artistCount: number;
    albumsCount?: number;
    tracksCount?: number;
    playlistsCount?: number;
}

export interface ISearchResult {
    artist?: IArtist;
    album?: IAlbum;
    track?: ITrack;
    artistsAvailable: number;
    albumsAvailable: number;
    tracksAvailable: number;
    playlistsAvailable: number;
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
    playlists: IPlaylist[];
}