import PlayerDownload from "components/main/icon/PlayerDownload"
import PlayerMix from "components/main/icon/PlayerMix"
import PlayerMore from "components/main/icon/PlayerMore"
import PlayerPlay from "components/main/icon/PlayerPlay"
import PlayerSearch from "components/main/icon/PlayerSearch"
import { IPlaylist } from "interfaces/playlist"
import List from "./list/List"
import { useGetTracksQuery } from "services/track"

interface IPlaylsitPageProps {
  playlist: IPlaylist
}

const PlaylistPage: React.FC<IPlaylsitPageProps> = () => {

  const { data: tracks } = useGetTracksQuery();

  return (
    <div>
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10 flex flex-row">
          <img src="assets/Hearts.png" alt="favorite" className="h-[225px] w-[368px] object-cover"/>
          <div className="flex flex-col">
            <span className="font-roboto font-semibold text-white text-base pt-[65px]">Playlist</span>
            <h2 className="font-montserrat font-bold text-white text-7xl">Favorite songs</h2>
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-row pl-[54px] py-[20px] text-white items-center">
            
            <PlayerPlay className="mr-[20px]"/>
            <PlayerMix className="mr-[20px]"/>
            <PlayerDownload className="mr-[20px]"/>
            <PlayerMore className="mr-[20px]"/>
            <PlayerSearch className="mr-[20px]"/>
            
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-col p-[54px]">
            
            {tracks ? <List tracks={tracks}/> : null}

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistPage