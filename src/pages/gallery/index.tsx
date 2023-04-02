import Image from 'next/image';
import { useState } from 'react';
import DateFormatter from '../../components/date-formatter';
import { Media } from '../../util/media-context';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import MainContainer from '../../components/main-container';
import { strapiFetchAll } from '../../util/strapi';
import { Artwork } from '../../util/types';
import { MdClose } from 'react-icons/md';

const TITLE = 'Art Gallery | Joinemm.dev';
const DESCRIPTION = 'My digital art portfolio.';

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

const MediaImage = (media) => {
  return (
    <Image src={media.url} alt={media.alternativeText} width={media.width} height={media.height} />
  );
};

export default function Movies({ artworks }: Props) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  const select = (artwork) => {
    setSelected(artwork);
    lockSroll();
  };

  const unselect = () => {
    setSelected(null);
    allowScroll();
  };

  const galleryColumns = (artworks, columns) => {
    return Array.from(Array(columns).keys()).map((n) => (
      <div key={n} className="flex flex-col">
        {artworks.map((artwork, m) =>
          m % columns == n ? (
            <figure
              key={artwork.id}
              onClick={() => select(artwork)}
              className="cursor-pointer overflow-hidden border-[3px] border-transparent transition-all hover:border-white"
            >
              <div>{MediaImage(artwork.media[0])}</div>
            </figure>
          ) : null,
        )}
      </div>
    ));
  };

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        canonical={DOMAIN + '/movies'}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: DOMAIN + '/movies',
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
            className="fixed top-4 right-4 z-50 mt-1 rounded-full border-2 bg-black bg-opacity-50 p-2 text-white"
            type="button"
            onClick={() => unselect()}
          >
            <MdClose size={35} />
          </button>
          <div className="flex min-h-full flex-col items-center justify-center gap-2">
            {selected.media.map((media) => (
              <figure key={media.id} className="relative max-h-screen max-w-screen-xl">
                <Image
                  src={media.url}
                  alt={media.alternativeText}
                  width={media.width}
                  height={media.height}
                  style={{ objectFit: 'contain', maxHeight: '100vh' }}
                />
              </figure>
            ))}
            <div className="text-center text-white">
              <p className="italic">“{selected.title}”</p>
              <DateFormatter dateString={selected.date} formatter="yyyy" />
            </div>
          </div>
        </div>
      )}
      <MainContainer>
        <h1 className="pb-4 text-3xl font-bold">Art Gallery.</h1>
      </MainContainer>

      <div className="m-auto fullgallery:max-w-[900px]">
        <Media greaterThanOrEqual="fullwidth" className="mt-2 grid grid-cols-3">
          {galleryColumns(artworks, 3)}
        </Media>
        <Media className="mt-2 grid grid-cols-2" lessThan="fullwidth">
          {galleryColumns(artworks, 2)}
        </Media>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const artworks = await strapiFetchAll('artworks', { populate: 'media' });

  return {
    props: {
      artworks: artworks.map((art) => {
        return {
          ...art,
          media: art.media.data.map((media) => {
            return {
              id: media.id,
              ...media.attributes,
            };
          }),
        };
      }),
    },
  };
};
