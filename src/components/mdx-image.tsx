/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  height?: number;
  width?: number;
  title?: string;
};

const MdxImage = ({ src, alt, height, width, title }: Props) => {
  return (
    <div>
      {width !== undefined && height !== undefined ? (
        <Image
          alt={alt ?? ''}
          src={src ?? ''}
          width={width}
          height={height}
          className="m-0 w-full rounded-lg"
        />
      ) : (
        <img className="m-0" alt={alt ?? ''} src={src ?? ''} />
      )}
      <p className="m-0 italic">{title ?? alt}</p>
    </div>
  );
};

export default MdxImage;
