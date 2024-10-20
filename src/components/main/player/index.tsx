import React from 'react';
import { API_URL } from 'utils/envData';
import { ChangeEvent } from 'react';
import PlayerPlay from '../icon/PlayerPlay';
import PlayerNext from '../icon/PlayerNext';
import PlayerPrev from '../icon/PlayerPrev';
import { useContext } from 'react';
import { PlayerContext } from './PlayerProvider';
import { timeFormat } from 'utils/timeFormat';

const Player: React.FC = () => {
  const { track, playPause, progress, audioRef } = useContext(PlayerContext)!;

  const imageSrc = API_URL + "/Images/400_";

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  if (!track) {
    return <></>;
  }

  return (
    <div className="fixed bottom-0 w-full h-[108px] flex flex-row bg-black z-50 items-center justify-between">
      <div className="flex px-[16px] py-[22px] w-1/3">
        <img src={imageSrc.concat(track.image)} alt="Cover Art" className="w-[66px] h-[66px] object-cover rounded-[6px]"/>
        <div className="flex flex-col justify-around pl-[14px] overflow-hidden">
          <span className="font-roboto font-medium text-white text-xl whitespace-nowrap overflow-hidden text-ellipsis">{track.name}</span>
          <span className="font-roboto font-medium text-[#BCBCBC] text-base whitespace-nowrap overflow-hidden text-ellipsis">{track.artistName}</span>
        </div>
      </div>

      <div className="flex flex-col w-1/3 justify-center items-center">
        <div className="flex flex-row relative top-[5px]">
          <button>
            <PlayerPrev className=""/>
          </button>
          <button onClick={playPause} className="mx-[14px]">
            <PlayerPlay className='w-[37px] h-[37px]'/>
          </button>
          <button>
            <PlayerNext className=""/>
          </button>
        </div>

        <div className="w-full">
          <div className="font-roboto font-normal text-base text-white flex justify-between leading-[10px]">
            <span className="">{audioRef.current ? timeFormat(audioRef.current.currentTime) : ""}</span>
            <span className="">{timeFormat(track.duration)}</span>
          </div>
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-[#383838] rounded-full appearance-none cursor-pointer 
              focus:outline-none"
            min="0"
            max="100"
            style={{
              background: `linear-gradient(to right, #FB2645 ${progress}%, #383838 ${progress}%)`
            }}
          />
        </div>
      </div>

      <div className='text-white text-2xl px-[16px] w-1/3 flex flex-row justify-end'>
        RIGHT
      </div>
    </div>
  );
};

export default Player;