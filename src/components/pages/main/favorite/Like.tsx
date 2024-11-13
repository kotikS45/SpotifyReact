import { useState } from "react";
import { Button } from "@headlessui/react";
import LikeF from "components/main/icon/LikeF.tsx";
import Like from "components/main/icon/Like.tsx";
import { ITrack } from "interfaces/track";
import { useLikeMutation, useUnlikeMutation } from "services/like";

interface ILikeProps {
    className?: string;
    track?: ITrack;
}

const LikeButton: React.FC<ILikeProps> = (props: ILikeProps) => {
    const [createLike] = useLikeMutation();
    const [deleteLike] = useUnlikeMutation();
    const [isLiked, setIsLiked] = useState(props.track?.isLiked || false);

    const handleLikeClick = async () => {
        if (props.track) {
            try {
                if (isLiked) {
                    await deleteLike(props.track.id).unwrap();
                    setIsLiked(false);
                } else {
                    await createLike(props.track.id).unwrap();
                    setIsLiked(true);
                }
            } catch (error) {
                console.error("Error updating like status", error);
            }
        }
    };

    return (
        <div className={props.className}>
            <Button onClick={handleLikeClick}>
                {isLiked ? (
                    <LikeF className="w-full h-full" />
                ) : (
                    <Like className="w-full h-full" />
                )}
            </Button>
        </div>
    );
};

export default LikeButton;
