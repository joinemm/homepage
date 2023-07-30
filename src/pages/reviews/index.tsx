import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';
import DateFormatter from '../../components/date-formatter';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Media } from '../../util/media-context';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import MainContainer from '../../components/main-container';
import { getMovieReviews, MovieReview } from '../../util/content-manager';

interface ExtendedReview extends MovieReview {
  title: string;
  type: string;
  image: string;
  genres: string[];
  year: number;
  tomatoURL?: string;
  imdbURL: string;
}

type SortingMethod = 'date_watched' | 'year' | 'rating' | 'title';

const sortingMethods = [
  {
    key: 'date_watched',
    label: 'recent',
  },
  {
    key: 'year',
    label: 'year',
  },
  {
    key: 'rating',
    label: 'rating',
  },
  {
    key: 'title',
    label: 'title',
  },
] as { key: SortingMethod; label: string }[];

const TITLE = 'REVIEWS | Joinemm.dev';
const DESCRIPTION = "Reviewing some random movies i've seen.";

const sortReviews = (
  reviews: ExtendedReview[],
  ascending: boolean,
  sortingMethod: SortingMethod,
) => {
  const sorted = [...reviews].sort((a, b) =>
    (
      ascending
        ? a[sortingMethod] < b[sortingMethod]
        : a[sortingMethod] > b[sortingMethod]
    )
      ? -1
      : 1,
  );
  return sorted;
};

type Props = {
  reviews: ExtendedReview[];
};

export default function Movies({ reviews }: Props) {
  const [reviewSorted, setReviewSorted] = useState(reviews);
  const [ascending, setAscending] = useState(false);
  const [sortingMethod, setSortingMethod] = useState<SortingMethod>('date_watched');

  useEffect(() => {
    setReviewSorted(sortReviews(reviews, ascending, sortingMethod));
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
      <MainContainer classname="border-t-2">
        <div className="flex items-center gap-2 overflow-scroll">
          <button onClick={() => setAscending(!ascending)}>
            {ascending ? (
              <TiArrowSortedUp size={26} />
            ) : (
              <TiArrowSortedDown size={26} />
            )}
          </button>
          <div className="flex gap-4">
            {sortingMethods.map(({ key, label }) => {
              return (
                <button
                  key={key}
                  className={`hover:accent underline-offset-4 ${
                    sortingMethod === key ? 'accent underline' : ''
                  }`}
                  onClick={() => setSortingMethod(key)}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <Media greaterThanOrEqual="mobile" className="ml-auto">
            <p>({reviewSorted.length})</p>
          </Media>
        </div>
        {reviewSorted.map((review) => (
          <article key={review.id} className="mb-8 flex">
            <div className="relative mr-4 h-36 w-24 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={review.image}
                alt={review.title}
                fill={true}
                sizes="96px"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-x-2">
                <h3 className="text-xl font-bold leading-5 m-0">
                  {review.title}{' '}
                  <span className="fg-muted h-full text-[1rem] mono">
                    ({review.year})
                  </span>
                </h3>
                <div className=" flex w-full gap-1 text-yellow-300 md:ml-auto md:w-auto">
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
              </div>
              <p className="leading-5 m-0 text-sm">
                {review.summary}{' '}
                <span className="fg-muted whitespace-nowrap">
                  -{' '}
                  <DateFormatter
                    className="fg-muted ml-auto text-sm"
                    dateString={review.date_watched}
                  />
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
  const rawReviews = await getMovieReviews();

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

async function imdbApiMovieDetails(review: MovieReview) {
  const api_url = 'https://imdb-api.projects.thetuhin.com';
  return await fetch(`${api_url}/title/${review.imdb_id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
    .catch((error) => {
      console.log(error);
      return {
        ...review,
      } as ExtendedReview;
    });
}
