import React, {useState} from "react";
import {Button, Input, Textarea} from "@headlessui/react";
import Image from "components/main/icon/Image.tsx";
import {useCreatePlaylistMutation} from "services/playlist.ts";

interface ModalProps {
    onClose: () => void;
}

const PlaylistCreate: React.FC<ModalProps> = ({ onClose }) => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = React.useState<File | undefined>(undefined);
    const [preview, setPreview] = React.useState<string | undefined>(undefined);

    const [createPlaylist] = useCreatePlaylistMutation();

    const handleAdd = async () => {
        console.log(image);
        if (image) {
            try {
                await createPlaylist({
                    name: name,
                    image: image
                }).unwrap();
                console.log(`Success`);
            } catch (error) {
                console.error("Failed: ", error);
            }
        }

        onClose();
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <form onSubmit={handleAdd}>
            <span className="font-roboto font-bold text-white text-3xl">Add playlist</span>
            <div className="w-[660px] flex flex-row mt-[40px]">
                <div className="relative w-[228px] h-[228px] mr-[25px] rounded-[6px]">
                    <div className="absolute bg-[#7C7C7C] opacity-25 w-full h-full rounded-[6px]"/>
                    <div className="relative flex items-center justify-center group w-full h-full">
                        {preview ? <img src={preview} alt="Upload image"
                             className="w-full h-full object-cover rounded-[6px]"/> : null}
                        <Button className="absolute">
                            <label htmlFor="image-upload">
                                <Image className="w-[100px] h-[100px] cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-500"/>
                            </label>
                            <input id="image-upload" type="file" accept="image/*" className="hidden"
                                   onChange={handleImageChange}/>
                        </Button>
                    </div>
                </div>
                <div className="w-[407px] flex flex-col">
                    <div className="relative">
                        <div className="absolute bg-[#7C7C7C] opacity-25 w-full h-full rounded-[6px]"/>
                        <Input
                            className="relative bg-transparent h-[55px] px-[20px] text-white w-full font-roboto text-base focus:border-none focus:ring-0 border-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="name"
                            placeholder="Playlist name"
                            required
                        />
                    </div>
                    <div className="relative mt-[17px]">
                        <div className="absolute bg-[#7C7C7C] opacity-25 w-full h-full rounded-[6px]"/>
                        <Textarea
                            className="relative bg-transparent h-[150px] px-[20px] text-white w-full font-roboto text-base focus:border-none focus:ring-0 border-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                            placeholder="Add description (not necessarily)"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-[32px]">
                <span className="w-[310px] font-roboto text-white text-xs">By continuing, you agree to grant MusicFlow access to the selected image. Make sure you have the right to use it.</span>
                <button type="submit"
                        className="w-[165px] h-[54px] rounded-[6px] bg-gradient-to-r from-[#59072F] to-[#DA0833] hover:bg-none flex justify-center items-center">
                    <span className="font-roboto font-bold text-2xl text-white">Save</span>
                </button>
            </div>
        </form>
    );
};

export default PlaylistCreate;
