import { Button } from "@headlessui/react";
import PlayerPlay from "components/main/icon/PlayerPlay";
import { PlayerContext } from "components/main/player/PlayerProvider";
import React, {useContext, useEffect, useState} from "react";
import { API_URL } from "utils/envData";
import {IAlbum} from "interfaces/album";
import {useGetTracksQuery} from "services/track.ts";
import {ITrack, ITrackFilter} from "interfaces/track";
import {useNavigate} from "react-router-dom";

interface IAlbumTileProps {
    album: IAlbum
}

const BestAlbum: React.FC<IAlbumTileProps> = ({ album }) => {
    const { playTracks } = useContext(PlayerContext)!;
    const imageSrc = API_URL + "/Images/800_";

    const [allTracks, setAllTracks] = useState<ITrack[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [filter, setFilter] = useState<ITrackFilter>({
        PageIndex: 0,
        PageSize: 2,
        AlbumId: album.id
    });

    const { data, isFetching } = useGetTracksQuery(filter);

    useEffect(() => {
        if (data) {
            setAllTracks(prevTracks => [...prevTracks, ...data.data]);

            if (data.data.length < filter.PageSize) {
                setHasMore(false);
            } else {
                setFilter(prev => ({ ...prev, PageIndex: prev.PageIndex + 1 }));

            }
        }
    }, [data]);

    const playAlbum = () => {

        console.log("play all tracks", allTracks);

        playTracks(allTracks);
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/album", { state: { album } });
    };

    return (
        <div className="relative bg-black w-[580px] h-[300px]">
            <div className="absolute inset-0 bg-[#7C7C7C] opacity-15 z-0 rounded-[5px]"/>
            <div className="relative z-10 flex flex-row w-full h-full" onClick={handleClick}>
                <div className="w-[300px] h-full flex items-center justify-center">
                    <img src={imageSrc.concat(album.image)} alt={album.name} className="w-[250px] h-[250px] object-cover cursor-pointer"/>
                </div>
                <div className="w-[260px] pr-[20px] flex flex-col justify-between">
                    <div className="flex flex-col w-full">
                        <span
                            className="font-roboto font-medium text-white text-2xl truncate pt-[50px]">{album.name}</span>
                        <span
                            className="font-roboto font-medium text-base truncate pt-[5px] text-[#7C7C7C]">{album.artist.name}</span>
                    </div>
                    <div className="flex flex-row items-end justify-end mb-[40px] w-full">
                        <Button className="" onClick={playAlbum}>
                            <PlayerPlay className="w-[60px] h-[60px]"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestAlbum