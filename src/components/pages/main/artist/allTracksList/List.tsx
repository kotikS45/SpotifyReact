import ListLine from "./ListLine.tsx";
import { ITrack } from "interfaces/track";
import React, {useState} from "react";
import {useModal} from "components/main/modal/ModalContext.tsx";
import Playlists from "components/main/modal/Playlists.tsx";

interface IListProps {
    tracks: ITrack[]
}

const List: React.FC<IListProps> = ({ tracks }) => {
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
    const itemHeight = 72;
    const { openModal, closeModal } = useModal();

    const openContextMenu = (e: React.MouseEvent, track: ITrack, index: number) => {
        e.preventDefault();
        setMenuPosition({ x: 740, y: (index + 1) * itemHeight });
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
        <div className="w-[700px]">
            {tracks ? tracks.map((item, index) => (
                <div key={item.id} className="">
                    <ListLine track={item} onContextMenu={(e) => openContextMenu(e, item, index)} />
                </div>
            )) : null}

            {menuPosition && (
                <>
                    <div
                        className="absolute bg-black rounded-[5px] z-[100] w-[120px] py-[2px]"
                        style={{ top: menuPosition.y, left: menuPosition.x }}
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