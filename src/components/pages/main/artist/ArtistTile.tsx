import { IArtist } from "interfaces/artist";
import {useNavigate} from "react-router-dom";
import {API_URL} from "utils/envData.ts";

interface IArtistTileProps {
  artist: IArtist;
}

const ArtistTile: React.FC<IArtistTileProps> = ({ artist }) => {

  const imageSrc = API_URL + "/Images/1200_";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/artist", { state: { artist } });
  };

  return (
      <div className="relative w-full h-[260px] bg-black rounded-l-[14px] cursor-pointer flex flex-row" onClick={handleClick}>
        <span className="absolute font-montserrat left-[50px] top-[60px] font-extrabold text-7xl
          text-white z-20 hover:underline decoration-2 underline-offset-8">{artist.name}</span>
        <img className="absolute right-[-100px] w-[1270px] h-[260px] object-cover object-center" src={imageSrc.concat(artist.image)} alt={artist.name}/>
        <div className="absolute right-[670px] w-[500px] h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"/>
      </div>
  )
}

export default ArtistTile;