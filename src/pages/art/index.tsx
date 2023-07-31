import Image from 'next/image';
import { useState } from 'react';
import { Media } from '../../util/media-context';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import MainContainer from '../../components/main-container';
import { MdClose } from 'react-icons/md';
import { getArt, getAssetUrl, CMSImage, Art } from '../../util/content-manager';
import Shadowbox from '../../components/shadowbox';

const TITLE = 'ART | Joinemm.dev';
const DESCRIPTION = 'My art portfolio.';
const PAGE_WIDTH = 50;

const allowScroll = () => {
  document.body.style.overflow = '';
  document.body.style.height = 'unset';
};
const lockSroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
};

const MediaImage = (image: CMSImage) => {
  return (
    <Image
      src={getAssetUrl(image.id, 'thumbnail')}
      alt={image.title}
      width={image.width}
      height={image.height}
      placeholder={image.placeholder ? 'blur' : undefined}
      blurDataURL={image.placeholder || undefined}
    />
  );
};

type Props = {
  artwork: Art[];
};

export default function Gallery({ artwork }: Props) {
  const [selected, setSelected] = useState<Art | null>(null);

  const select = (item: Art) => {
    setSelected(item);
    lockSroll();
  };

  const unselect = () => {
    setSelected(null);
    allowScroll();
  };

  const galleryColumns = (art: Art[], column_count: number) => {
    type Column = {
      length: number;
      figures: JSX.Element[];
    };

    var prev_year = 0;
    var columns: Column[] = [...Array(column_count)].map(() => {
      return { length: 0, figures: [] };
    });

    art.forEach((item) => {
      var min = columns[0];
      columns.forEach((x) => {
        if (x.length < min.length) min = x;
      });
      min.figures.push(
        <figure
          key={item.id}
          onClick={() => select(item)}
          className="cursor-pointer overflow-hidden box-border border-[2px] border-transparent transition-all hover:border-white"
        >
          {item.year != prev_year ? (
            <span className="absolute left-1/2 hidden -translate-x-[525px] -translate-y-2 extrawide:inline mono text-sm font-bold">
              {item.year} ——
            </span>
          ) : null}
          <div className="hovershine relative bg-black">
            {MediaImage(item.file)}
          </div>
        </figure>,
      );
      prev_year = item.year;
      min.length += item.file.height / item.file.width;
    });

    return columns.map((column, n) => {
      return (
        <div key={n} className="flex flex-col">
          {column.figures}
        </div>
      );
    });
  };

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        canonical={DOMAIN + '/art'}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: DOMAIN + '/art',
          images: [
            {
              url: getAssetUrl('4f5c5426-1049-490a-8290-0d60ff2a6fe0', 'orig'),
              alt: TITLE,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      {selected && (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen overflow-y-scroll bg-black bg-opacity-80">
          <button
            className="fixed top-4 right-4 z-50 mt-1 rounded-full border-2 bg-black bg-opacity-30 p-1 text-white"
            type="button"
            onClick={() => unselect()}
          >
            <MdClose size={30} />
          </button>
          <Shadowbox art={selected} unselect={() => unselect()} />
        </div>
      )}
      <MainContainer width={PAGE_WIDTH}>
        <Media greaterThanOrEqual="fullwidth" className="grid grid-cols-3">
          {galleryColumns(artwork, 3)}
        </Media>
        <Media className="grid grid-cols-2" lessThan="fullwidth">
          {galleryColumns(artwork, 2)}
        </Media>
      </MainContainer>
    </>
  );
}

export const getStaticProps = async () => {
  const art = await getArt();
  return {
    props: {
      artwork: art,
    },
  };
};
