import { Artwork } from '../util/types';
import Image from 'next/image';

type Props = {
  artwork: Artwork;
};

const MediaImage = (media) => {
  return (
    <Image src={media.url} alt={media.alternativeText} width={media.width} height={media.height} />
  );
};

const Art = ({ artwork }: Props) => {
  return (
    <figure
      key={artwork.id}
      className="cursor-pointer overflow-hidden border-[3px] border-transparent transition-all hover:border-white"
    >
      <div>{MediaImage(artwork.media[0])}</div>
    </figure>
  );
};

export default Art;
