import GenreWaveBackground from "./GenreWaveBackground";


interface IGenreTileProps {
  title: string,
  imageUrl: string
}

const GenreTile: React.FC<IGenreTileProps> = ({ title, imageUrl }) => {
  
  return (
    <div className="w-[310px] h-[182px] rounded-[16px] flex">
      <div className="w-1/2">
        <GenreWaveBackground color={stringToColor(title)} className="absolute z-0 rounded-[16px]"/>
        <h4 className="font-roboto font-semibold text-2xl text-white py-[25px] pl-[24px] z-10 absolute">{title}</h4>
      </div>
      <div className="w-1/2">
        <img src={imageUrl} alt={title} className="w-[155px] h-[182px] object-cover mx-auto rounded-r-[16px]"/>
      </div>
    </div>
  )
}

export default GenreTile

function stringToColor(str: string): string {
  // Хешування рядка
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Перетворення хешу в HEX колір
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}