import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import useLocalStorage from '../util/use-local-storage';

type Props = {
  storageKey: string;
};

const LikeButton = ({ storageKey }: Props) => {
  const [liked, setLiked] = useLocalStorage<boolean | null>(storageKey, null);

  const toggleLikeStatus = () => {
    setLiked(liked !== null ? !liked : true);
  };

  return (
    <div>
      {/* <p className="mr-2 inline-block text-sm">1</p> */}
      <button onClick={toggleLikeStatus}>
        {liked ? (
          <HiHeart size={20} className="inline-block text-red" />
        ) : (
          <HiOutlineHeart size={20} className="inline-block" />
        )}
      </button>
    </div>
  );
};

export default LikeButton;
