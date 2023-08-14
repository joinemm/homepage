import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
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
      <button onClick={toggleLikeStatus} aria-label="like">
        {liked ? (
          <HiHeart size={20} className="inline-block text-red-500" />
        ) : (
          <HiOutlineHeart size={20} className="inline-block" />
        )}
      </button>
    </div>
  );
};

export default LikeButton;
