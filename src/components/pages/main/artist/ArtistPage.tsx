import {useLocation} from "react-router-dom";
import React, { useState } from "react"
import {IArtist} from "interfaces/artist";
import {API_URL} from "utils/envData.ts";
import ArtistPageTracks from "components/pages/main/artist/ArtistPageTracks.tsx";
import ArtistPageAlbums from "components/pages/main/artist/ArtistPageAlbums.tsx";
import ArtistPageAll from "components/pages/main/artist/ArtistPageAll.tsx";
import {useGetArtistByIdQuery} from "services/artist.ts";

enum Tabs {
    All = "ALL",
    Tracks = "TRACKS",
    Albums = "ALBUMS",
}

const ArtistPage: React.FC = () => {
    const location = useLocation();
    const selectedArtist = location.state?.artist as IArtist;
    const imageSrc = API_URL + "/Images/1200_";
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.All);
    const { data: artist} = useGetArtistByIdQuery(selectedArtist.id);

    const renderContent = () => {
        if (artist)
        switch (activeTab) {
            case Tabs.All:
                return <ArtistPageAll artist={artist} toTracks={() => setActiveTab(Tabs.Tracks)} />;
            case Tabs.Tracks:
                return <ArtistPageTracks artist={artist}/>;
            case Tabs.Albums:
                return <ArtistPageAlbums artist={artist}/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="relative w-full h-[260px] bg-black rounded-l-[14px] flex flex-row">
                <span className="absolute font-montserrat left-[50px] top-[60px] font-extrabold text-7xl
                    text-white z-20">{artist?.name}</span>
                {artist?.image ? <img className="absolute right-[-100px] w-[1270px] h-[260px] object-cover object-center"
                                     src={imageSrc.concat(artist.image)} alt={artist?.name}/> : null}
                <div
                    className="absolute right-[670px] w-[500px] h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"/>
            </div>
            <div className="relative w-full bg-black rounded-l-[14px] flex flex-col mt-[10px] items-start">
                <div className="text-[#B60A31] font-roboto text-base flex flex-row pt-[30px] w-full pl-[34px] underline-offset-8">
                    <button className={`px-[20px] ${activeTab === Tabs.All ? "underline" : ""}`}
                            onClick={() => setActiveTab(Tabs.All)}>All
                    </button>
                    <button className={`px-[20px] ${activeTab === Tabs.Tracks ? "underline" : ""}`}
                            onClick={() => setActiveTab(Tabs.Tracks)}>Tracks
                    </button>
                    <button className={`px-[20px] ${activeTab === Tabs.Albums ? "underline" : ""}`}
                            onClick={() => setActiveTab(Tabs.Albums)}>Albums
                    </button>
                </div>
                <div className="flex flex-row w-full">
                    {artist ? renderContent() : null}
                </div>
            </div>
        </div>
    )
}

export default ArtistPage