import React, { useState, useEffect } from 'react';
import { getTrackById } from '../services/MusicFlowService.js';

const MusicPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const [track, setTrack] = useState(null);
    const audioRef = React.createRef();
    useEffect(() => {
        const fetchTrack = async () => {
            const trackId = 1; // Вкажіть ID треку, який ви хочете отримати
            const trackData = await getTrackById(trackId);
            if (trackData) {
                setTrack(trackData);
            }
        };

        fetchTrack();
    }, []);

    const handlePlayPause = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    return (
        <div className="music-player">
            {track ? (
                <div>
                    <h3>{track.name}</h3>
                    <p>Duration: {track.duration} seconds</p>
                    <p>Genres: {track.genres.map(genre => genre.name).join(', ')}</p>
                    <audio ref={audioRef} src={track.path} />
                    <button onClick={handlePlayPause}>
                        {playing ? 'Pause' : 'Play'}
                    </button>
                </div>
            ) : (
                <p>No track is playing</p>
            )}
        </div>
    );
};

export default MusicPlayer;