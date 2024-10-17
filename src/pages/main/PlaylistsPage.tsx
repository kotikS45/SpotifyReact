import { useGetPlaylistsQuery } from "services/playlist"
import { API_URL } from "utils/envData";
import PlaylistTile from "./PlaylistTile";


const PlaylistsPage = () => {
  const { data: playlists } = useGetPlaylistsQuery();
  const imageSrc = API_URL + "/Images/400_";

  return (
    <div>
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10 flex flex-row">
          <div className="w-[310px] h-[260px]">

          </div>
          <div className="flex flex-col">
            <span className="font-roboto font-semibold text-white text-base pt-[65px]">Playlist</span>
            <h2 className="font-montserrat font-bold text-white text-7xl">Your playlists</h2>
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-col p-[54px]">
            <span className="font-montserrat font-semibold text-2xl text-loginTextColor2">Your playlists</span>
            <div className="mt-[22px] w-full flex flex-row flex-wrap justify-start items-start">
              {playlists ? playlists.map((item) => (
                <div key={item.id} className="mr-[30px] my-[15px]">
                  <PlaylistTile title={item.name} imageUrl={imageSrc.concat(item.image)}/>
                </div>
                )) : null
              }
              <div className="flex flex-col mr-[30px] my-[15px]">
                <img src="assets/add_playlist_button.png" alt="Add a playlist" className="w-[145px] h-[145px] object-cover mx-auto rounded-[16px] opacity-100"/>
                <span className="font-roboto font-medium text-white text-base pt-[16px] text-center">Add a playlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistsPage