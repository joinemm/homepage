import Header from '../../components/header';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
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

async function imdbApiMovieDetails(review: Review, isRetry = false) {
  return await fetch(`https://imdb-api.tprojects.workers.dev/title/${review.imdbID}`)
    .then(async (res) => {
      return await res.json();
    })
    .then(async (data) => {
      return {
        ...review,
        title: data.title,
        type: data.contentType,
        image: data.image,
        year: data.year,
        imdbURL: data.imdb,
        genres: data.genre,
      } as ExtendedReview;
    })
    .catch(async (err) => {
      if (isRetry) {
        console.log(err);
        throw err;
      }
      return await imdbApiMovieDetails(review, true);
    });
}

async function omdbMovieDetails(review: Review) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=6be019fc&tomatoes=true&i=${review.imdbID}`,
  );
  const data = await res.json();
  return {
    ...review,
    title: data.Title,
    type: data.Type,
    image: data.Poster,
    year: data.Year,
    imdbURL: `https://www.imdb.com/title/${review.imdbID}`,
    tomatoURL: data.tomatoURL,
    genres: data.Genre.split(',').map(function (item) {
      return item.trim();
    }),
  } as ExtendedReview;
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

type Props = {
  reviews: ExtendedReview[];
};

export default function Movies({ reviews }: Props) {
  const [ascending, setAscending] = useState(false);
  const [sortingMethod, setSortingMethod] = useState<SortingMethod>('watched');

  reviews.sort((a, b) =>
    (ascending ? a[sortingMethod] < b[sortingMethod] : a[sortingMethod] > b[sortingMethod])
      ? -1
      : 1,
  );

  return (
    <>
      <Header />
      <NextSeo
        title="Movie Reviews | Joinemm.dev"
        description="I'm not a professional movie critic but here are my personal thoughts about some movies."
        canonical={DOMAIN + '/movies'}
        openGraph={{
          title: 'Movie Reviews | Joinemm.dev',
          description:
            "I'm not a professional movie critic but here are my personal thoughts about some movies.",
          url: DOMAIN + '/movies',
          images: [
            {
              url: `${DOMAIN}/assets/content/lego-movie.jpg`,
              alt: 'Movie Reviews | Joinemm.dev',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <div className="m-auto mt-8 max-w-3xl px-4">
        <h1 className="pb-4 text-2xl font-bold">Movie reviews.</h1>

        <p className="mb-4">
          I&apos;m not a professional movie critic but here are my personal thoughts about some
          movies.
        </p>
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
  // delay to prevent the api dying
  const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const extendedReviews = await Promise.all(
    rawReviews.map(async (review, index) => {
      await delay(100 * index);
      return await imdbApiMovieDetails(review);
    }),
  );

  return {
    props: {
      reviews: extendedReviews,
    },
  };
};
