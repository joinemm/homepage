import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

const MdxImage = ({ src, alt }: Props) => {
  return (
    <div className="relative my-4">
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
