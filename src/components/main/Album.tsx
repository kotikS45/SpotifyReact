import React from 'react';
import { IAlbum } from 'interfaces/album/index.ts';

interface AlbumProps {
  album: IAlbum;
}

const Album: React.FC<AlbumProps> = ({ album }) => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '10px',
        padding: '10px',
        width: '100%',
        height: '78px',
        backgroundColor: 'black',
        borderBottomLeftRadius: '14px',
        borderBottomRightRadius: '14px',
        opacity: 0.85,
        color: 'white',
      }}
    >
      <img
        src={album.image}
        alt={album.name}
        style={{
          maxWidth: '50px',
          maxHeight: '50px',
          borderRadius: '8px',
          marginRight: '10px',
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>{album.name}</h2>
        <p style={{ fontSize: '14px', color: '#aaa' }}>Artist: {album.artist.name}</p>
        <p style={{ fontSize: '14px', color: '#aaa' }}>
          Release Date: {new Date(album.releaseDate).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default Album;