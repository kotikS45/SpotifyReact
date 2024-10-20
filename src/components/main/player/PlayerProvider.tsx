import React, { createContext, useState, useRef, ReactNode, useEffect } from 'react';
import { ITrack } from 'interfaces/track';
import { API_URL } from 'utils/envData';

interface IPlayerContext {
  track: ITrack | null;
  isPlaying: boolean;
  progress: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  playTrack: (newTrack: ITrack) => void;
  playPause: () => void;
  playPrev: () => void;
  playNext: () => void;
  handleTimeUpdate: () => void;
}

export const PlayerContext = createContext<IPlayerContext | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  const audioUrl = API_URL + "/Audio/";

  const playTrack = (newTrack: ITrack) => {
    setTrack(newTrack);
    audioRef.current.src = audioUrl.concat(newTrack.path);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const playPrev = () => {

  }

  const playNext = () => {
    
  }

  useEffect(() => {
    let intervalId: number;

    if (isPlaying) {
      intervalId = setInterval(handleTimeUpdate, 1000);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      clearInterval(intervalId);
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        track,
        isPlaying,
        progress,
        audioRef,
        playTrack,
        playPause,
        playPrev,
        playNext,
        handleTimeUpdate,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};