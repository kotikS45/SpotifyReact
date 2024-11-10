import React from 'react';
import { IAlbum } from 'src/interfaces/album/index.ts';

interface AlbumProps {
  album: IAlbum;
}

const Album: React.FC<AlbumProps> = ({ album }) => {
  return (
    <div className="album">
      <img src={album.image} alt={album.name} className="album-image" />
      <h2>{album.name}</h2>
      <p>Artist: {album.artist.name}</p>
      <p>Release Date: {new Date(album.releaseDate).toDateString()}</p>
    </div>
  );
};

export default Album;