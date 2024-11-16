import { Button } from "@headlessui/react";
import PlayerMore from "components/main/icon/PlayerMore.tsx";
import PlayerPlay from "components/main/icon/PlayerPlay.tsx";
import { ITrack } from "interfaces/track";
import { API_URL } from "utils/envData.ts";
import { timeFormat } from "utils/timeFormat.ts";
import { PlayerContext } from "components/main/player/PlayerProvider.tsx";
import {useContext} from "react";
import LikeButton from "components/pages/main/favorite/Like.tsx"

interface IListLineProps {
  track: ITrack,
  onContextMenu: (e: React.MouseEvent, track: ITrack) => void;
}

const ListLine: React.FC<IListLineProps> = ({ track, onContextMenu }) => {
  const { playTracks } = useContext(PlayerContext)!;
  const imageSrc = API_URL + "/Images/200_";

  return (
    <div className="w-full h-[72px] rounded-[14px] relative">
      <div className="absolute inset-0 bg-[#7C7C7C] opacity-20 z-0 rounded-l-[14px]" />
      <div className="relative z-10 w-full bg-black hover:bg-transparent flex flex-row font-roboto font-normal text-[#BCBCBC] text-base">
        <div className="w-[10%] min-w-[300px] flex items-center">
          <div className="w-[50px] h-[50px] m-[12px] relative flex items-center justify-center group">
            <img src={imageSrc.concat(track.image)} alt={track.name} className="w-[50px] h-[50px] object-cover rounded-[14px]"/>
            <Button className="absolute invisible group-hover:visible" onClick={() => playTracks([track])}>
              <PlayerPlay className=" w-[34px] h-[34px]"/>
            </Button>
          </div>
          <div className="flex flex-col justify-around w-[220px]">
            <span className="font-roboto font-medium text-white text-lg truncate w-full">{track.name}</span>
            <span className="font-roboto font-medium text-[#BCBCBC] text-sm truncate">{track.artistName}</span>
          </div>
        </div>
        <div className="w-[44%] flex justify-center items-center p-[14px]">
          <span>{}</span>
        </div>
        <div className="w-[18%] flex justify-center items-center p-[14px]">
          <span className="truncate">{track.albumName}</span>
        </div>
        <div className="w-[18%] flex justify-center items-center p-[14px]">
          <span>{}</span>
        </div>
        <div className="w-[10%] flex flex-row justify-end items-center">
          <LikeButton className="w-[25px] h-[25px] mx-[15px]" track={track}/>
          <span className="font-roboto font-normal text-white text-sm mx-[15px]">{timeFormat(track.duration)}</span>
          <Button onClick={(e) => onContextMenu(e, track)}>
            <PlayerMore className="mx-[15px]" color="white"/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ListLine;