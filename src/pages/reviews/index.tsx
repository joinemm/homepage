import Header from '../../components/header';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';
import DateFormatter from '../../components/date-formatter';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Media } from '../../util/media-context';
import rawReviews from '../../../content/reviews.json';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import MainContainer from '../../components/main-container';

type Review = {
  title?: string;
  rating: number;
  summary?: string;
  imdbID: string;
  watched: string;
};

interface ExtendedReview extends Review {
  title: string;
  type: string;
  image: string;
  genres: string[];
  year: number;
  tomatoURL?: string;
  imdbURL: string;
}

type SortingMethod = 'watched' | 'year' | 'rating' | 'title';

const sortingMethods = [
  {
    key: 'watched',
    label: 'Recent',
  },
  {
    key: 'year',
    label: 'Year',
  },
  {
    key: 'rating',
    label: 'Rating',
  },
  {
    key: 'title',
    label: 'Title',
  },
] as { key: SortingMethod; label: string }[];

const TITLE = 'Movie Reviews | Joinemm.dev';
const DESCRIPTION =
  "I'm not a professional movie critic but here are my personal thoughts about some movies.";

type Props = {
  reviews: ExtendedReview[];
};

export default function Movies({ reviews }: Props) {
  const [ascending, setAscending] = useState(false);
  const [sortingMethod, setSortingMethod] = useState<SortingMethod>('watched');

  useEffect(() => {
    reviews.sort((a, b) =>
      (ascending ? a[sortingMethod] < b[sortingMethod] : a[sortingMethod] > b[sortingMethod])
        ? -1
        : 1,
    );
  }, [ascending, sortingMethod, reviews]);

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
              url: `${DOMAIN}/assets/content/lego-movie.jpg`,
              alt: TITLE,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <MainContainer>
        <h1 className="pb-4 text-3xl font-bold">Movie reviews.</h1>
        <p className="mb-4">{DESCRIPTION}</p>
        <div className="flex items-center gap-4 overflow-scroll pb-4">
          <button onClick={() => setAscending(!ascending)}>
            {ascending ? <TiArrowSortedUp size={26} /> : <TiArrowSortedDown size={26} />}
          </button>
          <div className="flex gap-6">
            {sortingMethods.map(({ key, label }) => {
              return (
                <button
                  key={key}
                  className={`hover:fg-bright underline underline-offset-4 ${
                    sortingMethod === key ? 'accent' : ''
                  }`}
                  onClick={() => setSortingMethod(key)}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <Media greaterThanOrEqual="sm" className="ml-auto">
            <p>({reviews.length})</p>
          </Media>
        </div>
        {reviews.map((review) => (
          <article key={review.imdbID} className="mb-6 flex">
            <div className="relative mr-4 mt-1 h-36 w-24 flex-shrink-0 overflow-hidden rounded-md">
              <Image src={review.image} alt={review.title} fill={true} sizes="96px" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-x-2">
                <h3 className="fg-bright text-xl font-bold">{review.title}</h3>
                <span className="fg-secondary text-sm font-normal">({review.year})</span>
                <Media greaterThanOrEqual="sm" className="ml-auto">
                  <div className="flex gap-1 text-yellow">
                    {[0, 2, 4, 6, 8].map((n) => {
                      return review.rating - n >= 2 ? (
                        <ImStarFull key={n} />
                      ) : review.rating - n >= 1 ? (
                        <ImStarHalf key={n} />
                      ) : (
                        <ImStarEmpty key={n} />
                      );
                    })}
                  </div>
                </Media>
              </div>
              <p className="leading-5">
                {review.summary}{' '}
                <span className="fg-muted">
                  -{' '}
                  <DateFormatter className="fg-muted ml-auto text-sm" dateString={review.watched} />
                </span>
              </p>
            </div>
          </article>
        ))}
      </MainContainer>
    </>
  );
}

export const getStaticProps = async () => {
  const extendedReviews = await Promise.all(
    rawReviews.map(async (review) => {
      return await imdbApiMovieDetails(review);
    }),
  );

  return {
    props: {
      reviews: extendedReviews,
    },
  };
};

async function imdbApiMovieDetails(review: Review) {
  const res = await fetch(`https://imdb-api.joinemm.workers.dev/title/${review.imdbID}`);
  const data = await res.json();

  return {
    ...review,
    title: data.title,
    type: data.contentType,
    image: data.image,
    year: data.year,
    imdbURL: data.imdb,
    genres: data.genre,
  } as ExtendedReview;
}
