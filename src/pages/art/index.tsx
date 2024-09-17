import Image from 'next/image';
import { ReactElement, useState } from 'react';
import { Media } from '../../util/media-context';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import MainContainer from '../../components/main-container';
import Shadowbox from '../../components/shadowbox';
import { ArtMeta, getSortedArtworks } from '../../util/art';

const TITLE = 'Joinemm :: Art';
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

const MediaImage = (image: string, prio: boolean) => {
  return (
    <Image
      src={'/img/art/' + image}
      alt={image}
      width={300}
      height={0}
      loading={prio ? 'eager' : 'lazy'}
      priority={prio}
    />
  );
};

type Props = {
  artwork: ArtMeta[];
};

export default function Gallery({ artwork }: Props) {
  const [selected, setSelected] = useState<ArtMeta | null>(null);

  const select = (item: ArtMeta) => {
    setSelected(item);
    lockSroll();
  };

  const unselect = () => {
    setSelected(null);
    allowScroll();
  };

  const galleryColumns = (art: ArtMeta[], column_count: number) => {
    type Column = {
      length: number;
      figures: ReactElement[];
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
          key={item.files[0]}
          onClick={() => select(item)}
          className="box-border cursor-pointer overflow-hidden border-[2px] border-transparent transition-all hover:border-white"
        >
          {item.year != prev_year ? (
            <span className="mono absolute left-1/2 hidden -translate-x-[525px] -translate-y-2 text-sm font-bold extrawide:inline">
              {item.year} ——
            </span>
          ) : null}
          <div className="hovershine relative bg-black">
            {MediaImage(item.files[0], min.length == 0)}
          </div>
        </figure>,
      );
      prev_year = item.year;
      min.length += 300;
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
              url: DOMAIN + '/img/lego-art.jpg',
              alt: TITLE,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      {selected && (
        <div className="fixed left-0 top-0 z-40 h-screen w-screen overflow-y-scroll bg-black bg-opacity-80">
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
  const art = getSortedArtworks();
  return {
    props: {
      artwork: art.filter((artwork) => artwork.published),
    },
  };
};
