/* eslint-disable @next/next/no-img-element */

type Props = {
  src?: string;
  alt?: string;
};

const MdxImage = ({ src, alt }: Props) => {
  return <img alt={alt} src={src} className="m-0 w-full rounded-lg" />;
};

export default MdxImage;
