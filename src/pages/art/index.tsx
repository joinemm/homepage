import Image from 'next/image';
import { useState } from 'react';
import { Media } from '../../util/media-context';
import { NextSeo } from 'next-seo';
import { DOMAIN, PAGE_WIDTH } from '../../util/constants';
import MainContainer from '../../components/main-container';
import { strapiFetchAll } from '../../util/strapi';
import { Artwork } from '../../util/types';
import { MdClose } from 'react-icons/md';

const TITLE = 'ART | Joinemm.dev';
const DESCRIPTION = 'My art portfolio.';

const allowScroll = () => {
  document.body.style.overflow = '';
  document.body.style.height = 'unset';
};
const lockSroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
};

type Props = {
  artworks: Artwork[];
};

const CLOUDINARY_BASE_URL =
  'https://res.cloudinary.com/dlccpcflb/image/upload/';

const MediaImage = (media) => {
  const width = PAGE_WIDTH / 2;
  const url = `${CLOUDINARY_BASE_URL}w_360,c_scale/${media.provider_metadata.public_id}`;
  return (
    <Image
      src={url}
      alt={media.alternativeText}
      width={width}
      height={Math.floor((width / media.width) * media.height)}
      placeholder={media.placeholder ? 'blur' : undefined}
      blurDataURL={media.placeholder}
    />
  );
};

export default function Art({ artworks }: Props) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  const select = (artwork) => {
    setSelected(artwork);
    lockSroll();
  };

  const unselect = () => {
    setSelected(null);
    allowScroll();
  };

  const galleryColumns = (artworks: Artwork[], column_count: number) => {
    type Column = {
      length: number;
      figures: JSX.Element[];
    };
    var columns: Column[] = [...Array(column_count)].map(() => {
      return { length: 0, figures: [] };
    });
    var prev_year = 0;
    artworks.forEach((artwork) => {
      var min = columns[0];
      columns.forEach((x) => {
        if (x.length < min.length) min = x;
      });
      min.figures.push(
        <figure
          key={artwork.id}
          onClick={() => select(artwork)}
          className="cursor-pointer overflow-hidden rounded-md border-[3px] border-transparent transition-all hover:border-white"
        >
          {artwork.year != prev_year ? (
            <p className="absolute left-1/2 hidden -translate-x-[545px] -translate-y-1 extrawide:inline">
              {artwork.year} ———
            </p>
          ) : null}
          <div className="bg-black">{MediaImage(artwork.media[0])}</div>
        </figure>,
      );
      prev_year = artwork.year;
      min.length += Math.floor(
        (PAGE_WIDTH / 2 / artwork.media[0].width) * artwork.media[0].height,
      );
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
              url: `${DOMAIN}/assets/content/lego-art.jpg`,
              alt: TITLE,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      {selected && (
        <div className="fixed top-0 left-0 z-40 h-full w-screen  overflow-y-scroll bg-black bg-opacity-80">
          <button
            className="fixed top-4 right-8 z-50 mt-1 rounded-full border-2 bg-black bg-opacity-50 p-2 text-white"
            type="button"
            onClick={() => unselect()}
          >
            <MdClose size={35} />
          </button>
          <div className="flex min-h-full flex-col items-center justify-center gap-2">
            {selected.media.map((media) => (
              <figure
                key={media.id}
                className="relative max-h-screen max-w-screen-xl"
              >
                <Image
                  src={media.url}
                  alt={media.alternativeText}
                  width={media.width}
                  height={media.height}
                  style={{ objectFit: 'contain', maxHeight: '95vh' }}
                  placeholder={media.placeholder ? 'blur' : undefined}
                  blurDataURL={media.placeholder}
                />
              </figure>
            ))}
            <div className="text-center text-white">
              <p className="italic">“{selected.title}”</p>
              <p>{selected.year}</p>
            </div>
          </div>
        </div>
      )}
      <MainContainer width={900}>
        <div className="m-auto fullgallery:max-w-[900px]">
          <Media
            greaterThanOrEqual="fullwidth"
            className="mt-2 grid grid-cols-3"
          >
            {galleryColumns(artworks, 3)}
          </Media>
          <Media className="mt-2 grid grid-cols-2" lessThan="fullwidth">
            {galleryColumns(artworks, 2)}
          </Media>
        </div>
      </MainContainer>
    </>
  );
}

async function getBase64ImageUrl(imageId: string) {
  if (process.env.NODE_ENV == 'development') return null;

  const url = `${CLOUDINARY_BASE_URL}w_100/e_blur:1000,q_auto,f_webp/${imageId}`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `data:image/webp;base64,${data}`;
}

export const getStaticProps = async () => {
  const artworks = await strapiFetchAll('artworks', {
    populate: 'media',
    sort: 'year:desc',
    'pagination[pageSize]': '50',
  });

  return {
    props: {
      artworks: await Promise.all(
        artworks.map(async (art) => {
          return {
            ...art,
            media: await Promise.all(
              art.media.data.map(async (media) => {
                return {
                  id: media.id,
                  placeholder: await getBase64ImageUrl(
                    media.attributes.provider_metadata.public_id,
                  ),
                  ...media.attributes,
                };
              }),
            ),
          };
        }),
      ),
    },
  };
};
