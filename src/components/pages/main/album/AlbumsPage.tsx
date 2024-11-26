import { useGetAlbumsQuery } from "services/album.ts"
import AlbumTile from "./AlbumTile.tsx";
import EmptyList from "components/main/error/EmptyList.tsx";

const AlbumsPage = () => {
  const { data: albums } = useGetAlbumsQuery({
    PageSize: 35,
    PageIndex: 0,
    IsRandom: true
  });
  return (
    <div>
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10 flex flex-row">
          <img src="assets/Album.png" alt="album" className="pl-[55px] pt-[41px] pb-[14px] pr-[38px]"/>
          <div className="flex flex-col">
            <span className="font-roboto font-semibold text-white text-base pt-[65px]">Best of</span>
            <h2 className="font-montserrat font-bold text-white text-7xl">Albums</h2>
          </div>
        </div>
      </div>
      <div className="w-full relative mt-[10px]">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="w-full relative z-10">
          <div className="flex flex-col p-[54px]">
            <span className="font-montserrat font-semibold text-2xl text-loginTextColor2">Recommended albums</span>
            <div className="mt-[22px] w-full flex flex-row flex-wrap justify-start items-start">
            {albums?.data ? albums.data.map((item) => (
                <div key={item.id} className="mr-[30px] my-[15px]">
                  <AlbumTile album={item}/>
                </div>
              )) :
                <div className="w-full flex justify-center items-center">
                  <EmptyList/>
                </div>}
            </div>
            <div className="h-[200px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage