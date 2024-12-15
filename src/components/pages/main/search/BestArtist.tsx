import React from "react";
import { API_URL } from "utils/envData";
import {IArtist} from "interfaces/artist";
import {useNavigate} from "react-router-dom";

interface IArtistTileProps {
    artist: IArtist
}

const BestArtist: React.FC<IArtistTileProps> = ({ artist }) => {
    const imageSrc = API_URL + "/Images/800_";
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/artist", { state: { artist } });
    };

    return (
        <div className="relative bg-black w-[580px] h-[300px]">
            <div className="absolute inset-0 bg-[#7C7C7C] opacity-15 z-0 rounded-[5px]"/>
            <div className="relative z-10 flex flex-row w-full h-full" onClick={handleClick}>
                <div className="w-[300px] h-full flex items-center justify-center">
                    <img src={imageSrc.concat(artist.image)} alt={artist.name} className="w-[250px] h-[250px] object-cover cursor-pointer"/>
                </div>
                <div className="w-[260px] pr-[20px] flex flex-col">
                    <div className="flex flex-col w-[250px]">
                        <span
                            className="font-roboto font-medium text-white text-2xl truncate pt-[50px]">{artist.name}</span>
                        <div className="pt-[50px] flex-wrap">
                            <span
                                className="font-roboto font-medium text-loginTextColor2 text-4xl truncate">{artist.followers} </span>
                            <span
                                className="font-roboto font-medium text-white text-base truncate pt-[50px]">followers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestArtist