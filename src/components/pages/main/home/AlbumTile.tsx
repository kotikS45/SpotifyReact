import { IAlbum } from "interfaces/album";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/envData";


interface IAlbumTileProps {
  album: IAlbum
  width?: string;
  height?: string;
}

const AlbumTile: React.FC<IAlbumTileProps> = ({ album, width = "145px", height = "145px" }) => {
  const navigate = useNavigate();
  const imageSrc = API_URL + "/Images/800_";

  const handleClick = () => {
    navigate("/album", { state: { album } });
  };

  return (
    <div className="flex flex-col cursor-pointer" style={{ width }} onClick={handleClick}>
      <img src={imageSrc.concat(album.image)} alt={album.name} className="object-cover mx-auto rounded-[16px]" style={{ width, height }}/>
      <span className="font-roboto font-medium text-white text-xl pt-[10px] truncate">{album.name}</span>
      <span className="font-roboto font-medium text-[#BCBCBC] text-base pt-[4px] truncate">{album.artist.name}</span>
    </div>
  )
}

export default AlbumTile