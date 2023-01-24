/* eslint-disable @next/next/no-img-element */

type Props = {
  src?: string;
  alt?: string;
};

const MdxImage = ({ src, alt }: Props) => {
  return <img alt={alt} src={src} className="rounded-lg w-full m-0" />;
};

export default MdxImage;
