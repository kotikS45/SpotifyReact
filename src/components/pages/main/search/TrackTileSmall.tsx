import { Button } from "@headlessui/react";
import PlayerPlay from "components/main/icon/PlayerPlay";
import { PlayerContext } from "components/main/player/PlayerProvider";
import { ITrack } from "interfaces/track";
import React, {useContext} from "react";
import { API_URL } from "utils/envData";
import {timeFormat} from "utils/timeFormat.ts";
import PlayerMore from "components/main/icon/PlayerMore.tsx";
import LikeButton from "components/pages/main/favorite/Like.tsx";

interface ITrackTileProps {
    track: ITrack,
    onContextMenu: (e: React.MouseEvent, track: ITrack) => void;
}

const TrackTile: React.FC<ITrackTileProps> = ({ track, onContextMenu }) => {
    const { playTracks } = useContext(PlayerContext)!;
    const imageSrc = API_URL + "/Images/800_";

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-[#7C7C7C] opacity-20 z-0 rounded-[5px]"/>
            <div className="relative z-10 w-full bg-black hover:bg-transparent flex flex-row pr-[10px] rounded-[5px]">

                <div className="w-[80px] h-[80px] relative flex items-center justify-center group">
                    <img src={imageSrc.concat(track.image)} alt={track.name}
                         className="w-[70px] h-[70px] object-cover rounded-[5px] p-[5px]"/>
                    <Button className="absolute invisible group-hover:visible" onClick={() => playTracks([track])}>
                        <PlayerPlay className=" w-[34px] h-[34px]"/>
                    </Button>
                </div>
                <div className="flex flex-col justify-center w-[200px] mr-[12px]">
                    <span className="font-roboto font-medium text-white text-xl truncate py-[2px]">{track.name}</span>
                    <span
                        className="font-roboto font-medium text-[#BCBCBC] text-base truncate py-[2px]">{track.artistName}</span>
                </div>
                <div className="flex justify-end items-center">
                    <span className="font-roboto font-normal pr-[16px] text-white text-[14px]">{timeFormat(track.duration)}</span>
                    <LikeButton className="w-[25px] h-[25px] mx-[15px]" track={track}/>
                    <Button onClick={(e) => onContextMenu(e, track)}>
                        <PlayerMore className="mx-[15px]" color="white"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TrackTile