import { IArtist } from "interfaces/artist";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/envData";


interface IArtistTileProps {
    artist: IArtist
}

const ArtistTile: React.FC<IArtistTileProps> = ({ artist }) => {
    const navigate = useNavigate();
    const imageSrc = API_URL + "/Images/800_";

    const handleClick = () => {
        navigate("/artist", { state: { artist } });
    };

    return (
        <div className="flex flex-col w-[180px] cursor-pointer" onClick={handleClick}>
            <img src={imageSrc.concat(artist.image)} alt={artist.name} className="w-[180px] h-[180px] object-cover mx-auto rounded-full"/>
            <span className="font-roboto font-medium text-white text-xl pt-[15px] truncate">{artist.name}</span>
        </div>
    )
}

export default ArtistTile;