import PlayerDownload from "components/main/icon/PlayerDownload"
import PlayerMix from "components/main/icon/PlayerMix"
import PlayerPlay from "components/main/icon/PlayerPlay"
import PlayerMore from "../../components/main/icon/PlayerMore"
import PlayerSearch from "../../components/main/icon/PlayerSearch"
import List from "./list/List"
import { useGetTracksQuery } from "services/track"
import { ITrackFilter } from "interfaces/track"
import { useContext } from "react"
import { PlayerContext } from "components/main/player/PlayerProvider"


const FavoritePage = () => {

  const filter: ITrackFilter = {
    PageIndex: 0,
    PageSize: 15,
  }

  const { playTracks } = useContext(PlayerContext)!;
  const { data } = useGetTracksQuery(filter);


  
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
            
            <button onClick={data ? () => playTracks(data?.data) : () => {}}>
              <PlayerPlay className="mr-[20px]"/>
            </button>
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
          <div className="flex flex-col px-[54px] pt-[16px]">
            
            {data ? <List tracks={data?.data}/> : null}

          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoritePage