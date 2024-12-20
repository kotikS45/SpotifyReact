import { IPlaylist } from "interfaces/playlist";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/envData";


interface IPlaylistTileProps {
    playlist: IPlaylist
}

const PlaylistTile: React.FC<IPlaylistTileProps> = ({ playlist }) => {
    const navigate = useNavigate();
    const imageSrc = API_URL + "/Images/800_";

    const handleClick = () => {
        navigate("/playlist", { state: { playlist } });
    };

    return (
        <div className="flex flex-col w-[245px] cursor-pointer" onClick={handleClick}>
            <img src={imageSrc.concat(playlist.image)} alt={playlist.name} className="w-[245px] h-[180px] object-cover mx-auto rounded-[8px]"/>
            <span className="font-roboto font-medium text-white text-xl pt-[10px] truncate">{playlist.name}</span>
        </div>
    )
}

export default PlaylistTile