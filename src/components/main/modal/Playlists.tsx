import React, {useState} from "react";
import { Button } from "@headlessui/react";
import {IPlaylist} from "interfaces/playlist";
import {API_URL} from "utils/envData.ts";
import {useGetPlaylistsQuery} from "services/playlist.ts";
import {useCreateTrackMutation} from "services/playlistTrack.ts";
import { ITrack } from "interfaces/track";

interface IPlaylistItemProps {
    playlist: IPlaylist,
    selected: boolean;
}

const PlaylistItem: React.FC<IPlaylistItemProps> = ({ playlist, selected }) => {

    const imageSrc = API_URL + "/Images/400_";

    return (
        <div className="flex flex-row w-[400px] bg-black hover:bg-[#222] rounded-[8px]"
            style={selected ? { backgroundColor: "#444" } : {}}>
            <div className="w-[55px]">
                <img src={imageSrc.concat(playlist.image)} alt={playlist.name} className="w-[55px] h-[55px] object-cover rounded-[5px]"/>
            </div>
            <div className="w-[345px] items-center justify-start flex">
                <span className="pl-[20px] font-roboto text-white text-xl">{playlist.name}</span>
            </div>
        </div>
    );
}

interface ModalProps {
    onClose: () => void;
    track: ITrack,
}

const Playlists: React.FC<ModalProps> = ({ onClose, track }) => {

    const [selected, setSelected] = useState<IPlaylist | null>(null);
    const [createTrack] = useCreateTrackMutation();

    const { data: playlists } = useGetPlaylistsQuery({
        PageSize: 30,
        PageIndex: 0,
        IsRandom: false
    });

    const handleAdd = async () => {

        if (selected) {
            try {
                await createTrack({
                    PlaylistId: selected.id,
                    TrackId: track.id,
                }).unwrap();
                console.log(`Track ${track.name} added to playlist ${selected.name}`);
            } catch (error) {
                console.error("Failed to add track to playlist:", error);
            }
        }

        onClose();
    }

    return (
        <div>
            <div className="">
                <span className="text-white text-3xl font-bold font-roboto text-center">Choose a playlist:</span>
            </div>
            <div className="pl-[20px] max-h-[400px] mt-[15px] overflow-y-auto">
                {playlists?.data ? playlists.data.map((item) => (
                    <div key={item.id} className="mr-[30px] my-[10px]">
                        <Button onClick={() => setSelected(item)}>
                            <PlaylistItem playlist={item} selected={selected == item}/>
                        </Button>
                    </div>
                )) : null}
            </div>
            <div className="flex justify-end">
                <Button onClick={handleAdd}
                        className="bg-gradient-to-r from-[#59072F] to-[#DA0833] hover:bg-none flex px-[10px] py-[3px] justify-center items-center w-[120px] rounded-[5px] mt-[10px]">
                    <span className="font-roboto font-semibold text-white text-xl">Add</span>
                </Button>
            </div>
        </div>
    );
};

export default Playlists;
