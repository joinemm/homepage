import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';
import DateFormatter from '../../components/date-formatter';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Media } from '../../util/media-context';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import MainContainer from '../../components/main-container';
import { strapiFetchAll } from '../../util/strapi';
import { Artwork } from '../../util/types';
import Art from '../../components/art';
import Header from '../../components/header';

const TITLE = 'Art Gallery | Joinemm.dev';
const DESCRIPTION = 'My digital art.';

const galleryColumns = (artworks, columns) => {
  return Array.from(Array(columns).keys()).map((n) => (
    <div key={n} className="flex flex-col">
      {artworks.map((artwork, m) =>
        m % columns == n ? <Art key={artwork.id} artwork={artwork} /> : null,
      )}
    </div>
  ));
};

type Props = {
  artworks: Artwork[];
};

export default function Movies({ artworks }: Props) {
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
