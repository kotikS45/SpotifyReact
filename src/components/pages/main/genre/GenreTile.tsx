import GenreWaveBackground from "./GenreWaveBackground.tsx";
import { colorSelectorDark } from "utils/colorSelector.ts";
import {useNavigate} from "react-router-dom";
import {ISearch} from "interfaces/search";

interface IGenreTileProps {
    id: number,
    title: string,
    imageUrl: string
}

const GenreTile: React.FC<IGenreTileProps> = ({ id, title, imageUrl }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        const props: ISearch = {
            genreId: id,
            artistCount: 8,
            albumsCount: 8,
            tracksCount: 8,
            playlistsCount: 6
        }

        navigate("/search", { state: { search: props } });
    };
    return (
        <div className="w-[310px] h-[182px] rounded-[16px] flex cursor-pointer" onClick={handleClick}>
            <div className="w-1/2">
                <GenreWaveBackground color={colorSelectorDark(title)} className="absolute z-0 rounded-l-[16px]"/>
                <h4 className="font-roboto font-semibold text-2xl text-white py-[25px] pl-[24px] z-10 absolute">{title}</h4>
            </div>
            <div className="w-1/2">
                <img src={imageUrl} alt={title} className="w-[155px] h-[182px] object-cover mx-auto rounded-r-[16px]"/>
            </div>
        </div>
    )
}

export default GenreTile