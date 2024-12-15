import {useLocation} from "react-router-dom";
import {ISearch} from "interfaces/search";
import {useGetPageByGenreQuery, useGetPageByNameQuery} from "services/search.ts";
import TrackTile from "components/pages/main/search/TrackTile.tsx";
import AlbumTile from "components/pages/main/search/AlbumTile.tsx";
import ArtistTile from "components/pages/main/search/ArtistTile.tsx";
import PlaylistTile from "components/pages/main/search/PlaylistTile.tsx";
import NotFound from "components/main/error/NotFound.tsx";
import React, {useState} from "react";
import TrackTileSmall from "components/pages/main/search/TrackTileSmall.tsx";
import {ITrack} from "interfaces/track";
import {useModal} from "components/main/modal/ModalContext.tsx";
import Playlists from "components/main/modal/Playlists.tsx";
import BestTrack from "components/pages/main/search/BestTrack.tsx";
import BestAlbum from "components/pages/main/search/BestAlbum.tsx";
import BestArtist from "components/pages/main/search/BestArtist.tsx";

const SearchPage = () => {
    const location = useLocation();
    const props = location.state?.search as ISearch;

    const genreQuery = useGetPageByGenreQuery(props, { skip: !props.genreId });
    const nameQuery = useGetPageByNameQuery(props, { skip: !!props.genreId });

    const data = props.genreId ? genreQuery : nameQuery;

    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
    const itemHeight = 90;
    const { openModal, closeModal } = useModal();

    const openContextMenu = (e: React.MouseEvent, track: ITrack, index: number) => {
        e.preventDefault();
        setMenuPosition({ x: 400 * (Math.floor((index) / 4) + 1), y: (index % 4 + 1) * itemHeight + 40 });
        setSelectedTrack(track);
    };

    const handleCloseMenu = () => {
        setMenuPosition(null);
        setSelectedTrack(null);
    };

    const handleAddToPlaylist = () => {
        if (selectedTrack) {
            openModal('Playlists', <Playlists onClose={closeModal} track={selectedTrack}/>)
        }
        handleCloseMenu();
    };

    return (
        <div className="w-full relative">
            <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px] pb-[40px]"/>
            <div className="ml-[50px] relative z-10 pb-[40px] pt-[40px]">

                {data.data?.tracks && data.data.tracks.length > 0 && (
                    <>
                        {
                            props.genreId ? (
                                <div>
                                    <span className="font-montserrat font-semibold text-2xl text-[#B60A31]">Music</span>
                                    <div className="flex flex-row mt-[25px]">
                                        {data.data.tracks.map((item) => (
                                            <div key={item.id} className="pr-[30px]">
                                                <TrackTile track={item}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex flex-row mt-[25px]">
                                        <div>
                                            <span className="font-montserrat font-semibold text-2xl text-[#B60A31]">The best result</span>
                                            <div className="mt-[25px]">
                                                {
                                                    (() => {
                                                        const trackNameLength = data.data.track?.name?.length ?? Infinity;
                                                        const albumNameLength = data.data.album?.name?.length ?? Infinity;
                                                        const artistNameLength = data.data.artist?.name?.length ?? Infinity;

                                                        const minLength = Math.min(trackNameLength, albumNameLength, artistNameLength);

                                                        if (minLength === trackNameLength) {
                                                            return data.data.track ? <BestTrack track={data.data.track} /> : null;
                                                        } else if (minLength === albumNameLength) {
                                                            return data.data.album ? <BestAlbum album={data.data.album} /> : null;
                                                        } else {
                                                            return data.data.artist ? <BestArtist artist={data.data.artist} /> : null;
                                                        }
                                                    })()
                                                }
                                            </div>
                                        </div>
                                        <div className="relative flex flex-col ml-[40px]">
                                            <span className="font-montserrat font-semibold text-2xl text-[#B60A31]">Music</span>
                                            <div className="flex flex-wrap flex-col mt-[25px] h-[360px]">
                                                {data.data.tracks.map((item, index) => (
                                                    <div key={item.id} className="py-[5px] mr-[5px]">
                                                        <TrackTileSmall track={item} onContextMenu={(e) => openContextMenu(e, item, index)}/>
                                                    </div>
                                                ))}
                                            </div>
                                            {menuPosition && (
                                                <>
                                                    <div
                                                        className="absolute bg-black rounded-[5px] z-[100] w-[120px] py-[2px]"
                                                        style={{ top: menuPosition.y, left: menuPosition.x }}
                                                    >
                                                        <button
                                                            className="w-full py-[1px] text-sm hover:bg-[#3B3B3B] text-white cursor-pointer rounded-[5px] font-roboto text-lg font-semibold"
                                                            onClick={handleAddToPlaylist}
                                                        >
                                                            Add to playlist
                                                        </button>
                                                    </div>
                                                    <div className="fixed inset-0" onClick={handleCloseMenu}></div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                    </>
                )}

                {data.data?.albums && data.data.albums.length > 0 && (
                    <div className="mt-[40px]">
                        <span className="font-montserrat font-semibold text-2xl text-[#B60A31]">Albums</span>
                        <div className="flex flex-row mt-[25px]">
                            {data.data?.albums ? data.data.albums.map((item) => (
                                <div key={item.id} className="pr-[30px]">
                                    <AlbumTile album={item}/>
                                </div>
                            )) : null}
                        </div>
                    </div>
                )}

                {data.data?.playlists && data.data.playlists.length > 0 && (
                    <div className="mt-[40px]">
                        <span className="font-montserrat font-semibold text-2xl text-[#B60A31]">Playlists</span>
                        <div className="flex flex-row mt-[25px]">
                            {data.data?.playlists ? data.data.playlists.map((item) => (
                                <div key={item.id} className="pr-[30px]">
                                    <PlaylistTile playlist={item}/>
                                </div>
                            )) : null}
                        </div>
                    </div>
                )}

                {data.data?.artists && data.data.artists.length > 0 && (
                    <div className="mt-[40px]">
                        <span className="font-montserrat font-semibold text-2xl text-[#B60A31]">Artists</span>
                        <div className="flex flex-row mt-[25px]">
                            {data.data?.artists ? data.data.artists.map((item) => (
                                <div key={item.id} className="pr-[30px]">
                                    <ArtistTile artist={item}/>
                                </div>
                            )) : null}
                        </div>
                    </div>
                )}

                {data.data?.artists.length == 0 && data.data?.playlists.length == 0 && data.data?.albums.length == 0 && data.data?.tracks.length == 0 && (
                    <div>
                        <NotFound/>
                    </div>
                )}

            </div>
        </div>
    )
}

export default SearchPage;