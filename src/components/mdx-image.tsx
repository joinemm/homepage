import Image from 'next/image';
import { CDN_DOMAIN } from '../util/constants';
import { getAssetUrl } from '../util/content-manager';

type Props = {
  src: string;
  alt: string;
};

const MdxImage = ({ src, alt }: Props) => {
  if (src.startsWith('https://' + CDN_DOMAIN)) {
    const id = src.split('/').pop();
    if (id) src = getAssetUrl(id, 'orig');
  }

  return (
    <div className="relative">
      <Image
        alt={alt}
        src={src}
        fill
        className="!relative !h-[unset] !w-full rounded-sm object-contain"
      />
      <p className="fg-muted m-0 italic">{alt}</p>
    </div>
  );
};

export default MdxImage;
