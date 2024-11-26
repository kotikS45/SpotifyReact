import ListHeader from "./ListHeader.tsx";
import ListLine from "./ListLine.tsx";
import { ITrack } from "interfaces/track";
import React, {useState} from "react";
import {useModal} from "components/main/modal/ModalContext.tsx";
import Playlists from "components/main/modal/Playlists.tsx";
import {IAlbum} from "interfaces/album";

interface IListProps {
    tracks: ITrack[],
    album: IAlbum,
}

const List: React.FC<IListProps> = ({ tracks }) => {
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
    const itemHeight = 72;
    const { openModal, closeModal } = useModal();

    const openContextMenu = (e: React.MouseEvent, track: ITrack, index: number) => {
        e.preventDefault();
        setMenuPosition({ x: 50, y: (index + 2) * itemHeight });
        setSelectedTrack(track);
    };

    const handleCloseMenu = () => {
        setMenuPosition(null);
        setSelectedTrack(null);
    };

    const handleAddToPlaylist = () => {
        if (selectedTrack) {
            openModal('Playlists', <Playlists onClose={closeModal} track={selectedTrack}/>)
        }
        handleCloseMenu();
    };

    return (
        <div className="w-full">
            <ListHeader col1="Title" col2="You have listened to" col3="Album" col4="Date added" col5="Time"/>
            {tracks ? tracks.map((item, index) => (
                <div key={item.id} className="">
                    <ListLine track={item} onContextMenu={(e) => openContextMenu(e, item, index)} />
                </div>
            )) : null}

            {menuPosition && (
                <>
                    <div
                        className="absolute bg-black rounded-[5px] z-[100] w-[160px] py-[2px]"
                        style={{top: menuPosition.y, right: menuPosition.x}}
                    >
                        <button
                            className="w-full py-[1px] text-sm hover:bg-[#3B3B3B] text-white cursor-pointer rounded-[5px] font-roboto text-lg font-semibold"
                            onClick={handleAddToPlaylist}
                        >
                            Add to playlist
                        </button>
                    </div>
                    <div className="fixed inset-0" onClick={handleCloseMenu}></div>
                </>
            )}
        </div>
    );
}

export default List;