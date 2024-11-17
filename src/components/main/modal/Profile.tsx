import React, { useEffect } from "react";
import { Button, Input } from "@headlessui/react";
import Image from '../icon/Image';
import { API_URL } from 'utils/envData';
import { userApi } from 'services/user';

interface ModalProps {
  onClose: () => void;
}

const Profile: React.FC<ModalProps> = ({ onClose }) => {
  const [username, setUsername] = React.useState<string | undefined>("");
  const [image, setImage] = React.useState<File | undefined>(undefined);
  const [preview, setPreview] = React.useState<string | undefined>(undefined);
  const user = userApi.useGetInfoQuery().data;
  const [updateUser] = userApi.useUpdateUserMutation();

  const imageSrc = API_URL + "/images/800_";

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
      setPreview(imageSrc + user.photo);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { username, image };
    await updateUser(data);
    onClose();
  };

  return (
      <div>
        <form className="flex flex-col items-center" onSubmit={updateUserHandler}>
          <div className="relative flex items-center justify-center group">
            <img src={preview} alt={user?.userName} className="w-[185px] h-[185px] object-cover rounded-full" />
            <Button className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500">
              <label htmlFor="image-upload">
                <Image className="w-[70px] h-[70px] cursor-pointer" />
              </label>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </Button>
          </div>
          <Input
              className="bg-loginEditTextBg mt-[46px] text-white w-[258px] text-center h-[55px] font-montserrat font-extrabold text-2xl focus:border-none rounded-lg focus:ring-0 border-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="email"
              type="name"
              placeholder="Username"
              required
          />
          <button type="submit" className="my-[28px] w-[165px] h-[54px] rounded-[6px] bg-gradient-to-r from-[#59072F] to-[#DA0833] hover:bg-none flex justify-center items-center">
            <span className="font-roboto font-semibold text-2xl text-white">Save</span>
          </button>
        </form>
        <div className="font-roboto font-normal text-xs text-white text-center">
          <span>By continuing, you agree to grant MusicFlow access to the selected image.</span>
          <br />
          <span>Make sure you have the right to use it.</span>
        </div>
      </div>
  );
};

export default Profile;
