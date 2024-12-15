import { Button } from "@headlessui/react";
import PlayerPlay from "components/main/icon/PlayerPlay";
import { PlayerContext } from "components/main/player/PlayerProvider";
import { ITrack } from "interfaces/track";
import React, { useContext } from "react";
import { API_URL } from "utils/envData";

interface ITrackTileProps {
    track: ITrack
}

const BestTrack: React.FC<ITrackTileProps> = ({ track }) => {
    const { playTracks } = useContext(PlayerContext)!;
    const imageSrc = API_URL + "/Images/800_";

    return (
        <div className="relative bg-black w-[580px] h-[300px]">
            <div className="absolute inset-0 bg-[#7C7C7C] opacity-15 z-0 rounded-[5px]"/>
            <div className="relative z-10 flex flex-row w-full h-full">
                <div className="w-[300px] h-full flex items-center justify-center">
                    <img src={imageSrc.concat(track.image)} alt={track.name} className="w-[250px] h-[250px] object-cover"/>
                </div>
                <div className="w-[260px] pr-[20px] flex flex-col justify-between">
                    <div className="flex flex-col">
                        <span
                            className="font-roboto font-medium text-white text-2xl truncate pt-[50px]">{track.name}</span>
                        <span
                            className="font-roboto font-medium text-base truncate pt-[5px] text-[#7C7C7C]">{track.artistName}</span>
                    </div>
                    <div className="flex flex-row justify-between items-end mb-[40px]">
                        <div className="flex flex-col mt-auto mb-auto">
                        <span
                            className="font-roboto font-medium text-white text-[14px] truncate pt-[5px]">Genre - {track.genres[0].name}</span>
                        </div>
                        <Button className="" onClick={() => playTracks([track])}>
                            <PlayerPlay className="w-[60px] h-[60px]"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestTrack