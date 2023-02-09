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
      <Header />
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
      <div className="m-auto mt-8 max-w-3xl px-4">
        <h1 className="pb-4 text-2xl font-bold">Movie reviews.</h1>

        <p className="mb-4">{DESCRIPTION}</p>
        <div className="flex items-center gap-4 overflow-scroll pb-4">
          <button onClick={() => setAscending(!ascending)}>
            {ascending ? <TiArrowSortedUp size={26} /> : <TiArrowSortedDown size={26} />}
          </button>
          <div className="fg-secondary flex gap-3">
            {sortingMethods.map(({ key, label }) => {
              return (
                <button
                  key={key}
                  className={`rounded-full border px-3 pb-1 text-sm ${
                    sortingMethod === key ? 'invert-colors' : ''
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
          <article key={review.imdbID} className="mb-4 flex">
            <div className="relative mr-4 h-36 w-24 flex-shrink-0 overflow-hidden rounded-sm">
              <Image src={review.image} alt={review.title} fill={true} sizes="96px" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-x-2">
                <h3 className="text-xl font-bold">{review.title}</h3>
                <span className="fg-secondary text-sm font-normal">({review.year})</span>
                <Media greaterThanOrEqual="sm" className="ml-auto">
                  <DateFormatter
                    className="fg-secondary ml-auto text-sm"
                    dateString={review.watched}
                  />
                </Media>
              </div>

              <div className="my-1 flex flex-row flex-wrap items-center gap-x-2">
                <div className="flex gap-1 text-yellow-400">
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

                <span className="text-sm">{review.rating}</span>

                {review.genres && (
                  <Media greaterThanOrEqual="sm" className="flex gap-2 text-blue-300 md:ml-2">
                    {review.genres.map((genre) => (
                      <span key={genre}>#{genre}</span>
                    ))}
                  </Media>
                )}
                <Media greaterThanOrEqual="sm" className="ml-auto flex gap-2">
                  {review.imdbURL && (
                    <a
                      href={review.imdbURL}
                      className="rounded-md border border-yellow-400 px-1 text-sm"
                    >
                      IMDb
                    </a>
                  )}
                  {review.tomatoURL && (
                    <a
                      href={review.tomatoURL}
                      className="rounded-md border border-green-600 px-1 text-sm"
                    >
                      RT
                    </a>
                  )}
                </Media>
              </div>
              <p className="fg-secondary italic">{review.summary}</p>
            </div>
          </article>
        ))}
      </div>
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
