import PlayerDownload from "components/main/icon/PlayerDownload.tsx"
import PlayerMix from "components/main/icon/PlayerMix.tsx"
import PlayerMore from "components/main/icon/PlayerMore.tsx"
import PlayerPlay from "components/main/icon/PlayerPlay.tsx"
import PlayerSearch from "components/main/icon/PlayerSearch.tsx"
import { IPlaylist } from "interfaces/playlist"
import List from "components/pages/main/playlist/tracksList/List.tsx"
import {useLocation, useNavigate} from "react-router-dom";
import {useGetTracksQuery} from "services/playlistTrack.ts"
import { IPlaylistTrackFilter } from "interfaces/playlistTrack"
import React, { useContext, useEffect, useState } from "react"
import { PlayerContext } from "components/main/player/PlayerProvider.tsx"
import { API_URL } from "utils/envData.ts"
import {Button} from "@headlessui/react";
import {useDeletePlaylistMutation} from "services/playlist.ts";
import EmptyList from "components/main/error/EmptyList.tsx";

const PlaylistPage: React.FC = () => {
  const location = useLocation();
  const playlist = location.state?.playlist as IPlaylist;
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const [filter, setFilter] = useState<IPlaylistTrackFilter>({
    PageIndex: 0,
    PageSize: 10,
    PlaylistId: playlist.id
  });

  const imageSrc = API_URL + "/Images/1200_";

  const [allTracks, setAllTracks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { playTracks } = useContext(PlayerContext)!;
  const { data, isFetching } = useGetTracksQuery(filter);
  const [deletePlaylist] = useDeletePlaylistMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (filter.PageSize && data.data.length < filter.PageSize) {
        setHasMore(false);
      }

      setAllTracks((prevTracks) => {
        const newTracks = data.data.filter(
            (track) => !prevTracks.some((prevTrack) => prevTrack.id === track.id)
        );
        return [...prevTracks, ...newTracks];
      });
    }
  }, [data]);

  const openContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: 50, y: 50 });
  };

  const handleCloseMenu = () => {
    setMenuPosition(null);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching && hasMore) {
      setFilter(prev => ({ ...prev, PageIndex: prev.PageIndex ? prev.PageIndex + 1 : 0 }));
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlist.id).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed: ", error);
    }

    handleCloseMenu();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, hasMore]);

  return (
    <div className="">
      <div className="w-full relative">
  <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
  <div className="w-full relative z-10 flex flex-row">
    <div className="relative h-[225px] w-[368px] mr-[40px] rounded-l-[14px] overflow-hidden">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
        }}
      />
      <img
        src={imageSrc.concat(playlist.image)}
        alt="favorite"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex flex-col">
      <span className="font-roboto font-semibold text-white text-base pt-[65px]">
        Playlist
      </span>
      <h2 className="font-montserrat font-bold text-white text-7xl">
        {playlist.name}
      </h2>
    </div>
  </div>
</div>

      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-row pl-[54px] py-[20px] text-white items-center">
            
            <button onClick={allTracks.length ? () => playTracks(allTracks) : () => {}}>
              <PlayerPlay className="mr-[20px]"/>
            </button>
            <PlayerMix className="mr-[20px]"/>
            <PlayerDownload className="mr-[20px]"/>
            <Button onClick={(e) => openContextMenu(e)}>
              <PlayerMore className="mr-[20px]"/>
            </Button>
            <PlayerSearch className="mr-[20px]"/>


            {menuPosition && (
                <>
                  <div
                      className="relative bg-black rounded-[5px] z-[100] w-[160px] py-[2px]"
                  >
                    <button
                        className="w-full py-[1px] text-sm hover:bg-[#3B3B3B] text-white cursor-pointer rounded-[5px] font-roboto text-lg font-semibold"
                        onClick={handleDeletePlaylist}
                    >
                      Delete playlist
                    </button>
                  </div>
                  <div className="fixed inset-0" onClick={handleCloseMenu}></div>
                </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-col px-[54px] pt-[16px] pb-[60px]">
            
            {allTracks.length ? <List tracks={allTracks} playlist={playlist}/> : <EmptyList/>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistPage