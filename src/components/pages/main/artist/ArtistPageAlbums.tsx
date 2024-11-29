import { IArtist } from "interfaces/artist";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import {Navigation, Pagination} from "swiper/modules";
import AlbumTile from "components/pages/main/home/AlbumTile.tsx";
import {useGetAlbumsQuery} from "services/album.ts";

interface IArtistTileProps {
    artist: IArtist;
}

const ArtistPageAlbums: React.FC<IArtistTileProps> = ({ artist }) => {

    const {data: albums} = useGetAlbumsQuery({
        PageIndex: 0,
        PageSize: 10,
        ArtistId: artist.id,
        IsRandom: true,
    });

    return (
        <div className="relative w-full flex flex-row">
            <div className="flex flex-col px-[54px] py-[16px] w-full">

                <Swiper
                    modules={[Pagination, Navigation]}
                    slidesPerView={7}
                    spaceBetween={1}
                    navigation
                    className="mt-[22px] w-full ml-[0px]"
                    style={{
                        margin: 0,
                        padding: 0
                    }}>

                    {albums ? albums.data.map((item) => (
                        <SwiperSlide key={item.id} style={{padding: 0, margin: 0}}>
                            <div className="my-[15px]">
                                <AlbumTile album={item} width="200px" height="200px"/>
                            </div>
                        </SwiperSlide>
                    )) : null}
                </Swiper>

            </div>
        </div>
    )
}

export default ArtistPageAlbums;