

interface IPlaylistTileProps {
  title: string,
  imageUrl: string
}

const PlaylistTile: React.FC<IPlaylistTileProps> = ({title, imageUrl}) => {

  return (
    <div className="flex flex-col">
      <img src={imageUrl} alt={title} className="w-[145px] h-[145px] object-cover mx-auto rounded-[16px]"/>
      <span className="font-roboto font-medium text-white text-base pt-[16px]">{title}</span>
    </div>
  )
}

export default PlaylistTile