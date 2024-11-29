import { IArtist } from "interfaces/artist";
import EmptyList from "components/main/error/EmptyList.tsx";
import List from "components/pages/main/artist/allTracksList/List.tsx";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {ITrack, ITrackFilter} from "interfaces/track";
import {useGetTracksQuery} from "services/track.ts";
import {useFollowMutation, useUnfollowMutation} from "services/follower.ts";
import {IAlbum, IAlbumFilter} from "interfaces/album";
import {useGetAlbumsQuery} from "services/album.ts";
import AlbumTile from "components/pages/main/album/AlbumTile.tsx";

interface IArtistTileProps {
    artist: IArtist;
    toTracks: MouseEventHandler<HTMLButtonElement>;
}

const ArtistPageAll: React.FC<IArtistTileProps> = ({ artist, toTracks }) => {
    const [trackFilter] = useState<ITrackFilter>({
        PageIndex: 0,
        PageSize: 5,
        ArtistId: artist.id,
        IsRandom: true,
    });

    const [albumFilter] = useState<IAlbumFilter>({
        PageIndex: 0,
        PageSize: 4,
        ArtistId: artist.id,
        IsRandom: true,
    });

    const [followArtist] = useFollowMutation();
    const [unfollowArtist] = useUnfollowMutation();

    const [followed, setFollowed] = useState(artist.isFollowed);
    const [allTracks, setAllTracks] = useState<ITrack[]>([]);
    const [allAlbums, setAllAlbums] = useState<IAlbum[]>([]);
    const tracks = useGetTracksQuery(trackFilter);
    const albums = useGetAlbumsQuery(albumFilter);

    const followHandler = async () => {
        try {
            await followArtist(artist.id).unwrap();
            setFollowed(true);
            console.log("follow")
        } catch (error) {
            console.error("Failed to follow artist:", error);
        }
    };

    const unfollowHandler = async () => {
        try {
            await unfollowArtist(artist.id).unwrap();
            setFollowed(false);
            console.log("unfollow")
        } catch (error) {
            console.error("Failed to unfollow artist:", error);
        }
    };

    useEffect(() => {
        if (tracks.data){
            setAllTracks(tracks.data.data);
        }
    }, [tracks]);

    useEffect(() => {
        if (albums.data)
            setAllAlbums(albums.data.data);
    }, [albums]);

    return (
        <div className="relative w-full flex flex-roe items-start">
            <div className="flex flex-col">
                <div className="flex flex-col px-[44px] py-[16px]">

                    {allTracks.length ? <List tracks={allTracks}/> : <EmptyList/>}

                </div>
                <div className="text-[#BCBCBC] font-roboto font-medium text-base pl-[54px] pb-[30px]">
                    <button onClick={toTracks}>See more</button>
                </div>
            </div>
            <div className="flex flex-col pl-[110px]">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <span className="font-montserrat font-semibold text-white text-[28px]">0</span>
                        <span className="font-roboto font-medium text-[#BCBCBC] text-base">Auditions</span>
                    </div>
                    <div className="flex flex-col pl-[60px]">
                        <span className="font-montserrat font-semibold text-white text-[28px]">{artist.followers}</span>
                        <span className="font-roboto font-medium text-[#BCBCBC] text-base">Followers</span>
                    </div>
                    <div className="pt-[4px] ml-[65px]">
                        {
                            followed ?
                                <button className="font-roboto font-medium text-white w-[134px] h-[34px]
                                    text-xl border-2 border-[#B60A31] rounded-full"
                                        onClick={unfollowHandler}>Unfollow</button>
                                :
                                <button className="font-roboto font-medium text-black text-xl w-[134px] h-[34px]
                                    border-2 border-[#B60A31] rounded-full bg-[#B60A31] hover:bg-transparent hover:text-white transition-all duration-200"
                                        onClick={followHandler}>Follow</button>
                        }
                    </div>
                </div>
                <div className="flex flex-col mt-[60px]">
                    <span className="font-montserrat font-semibold text-[#B60A31] text-2xl">Albums</span>
                    <div className="flex flex-row mt-[30px]">
                        {allAlbums ? allAlbums.map((item, index) => (
                            <div key={index} className="pr-[32px]">
                                <AlbumTile album={item}/>
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPageAll;