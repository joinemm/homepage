const DIRECTUS = 'https://directus.joinemm.dev';
import { parse } from 'date-fns';

export type CMSImage = {
  id: string;
  width: number;
  height: number;
  title: string;
  placeholder?: string;
  directus_files_id?: string;
};

export type Art = {
  id: string;
  year: number;
  date_created: string;
  medium?: string;
  title: string;
  description?: string;
  file: CMSImage;
  extra_files: CMSImage[];
};

export type MovieReview = {
  id: number;
  imdb_id: string;
  title?: string;
  rating: number;
  summary?: string;
  date_watched: string;
};

async function getFileInfo(id: string): Promise<CMSImage> {
  return await apiRequest(`/files/${id}?fields=id,width,height,title`);
}

async function getBase64ImageUrl(id: string): Promise<string | undefined> {
  // if (process.env.NODE_ENV == 'development') return undefined;
  const url = getAssetUrl(id, 'loading');
  console.log(url);
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `data:image/webp;base64,${data}`;
}

export function getAssetUrl(
  assetUUID: string,
  transform: 'loading' | 'thumbnail' | null = null,
): string {
  return (
    `${DIRECTUS}/assets/${assetUUID}` + (transform ? `?key=${transform}` : '')
  );
}

export async function getArt(): Promise<Art[]> {
  const filter = '[status][_eq]=published';
  const fields =
    'id,title,description,date_created,medium,file.id,file.width,file.height,file.title,extra_files.directus_files_id';
  const path = `/items/art?filter${filter}&fields=${fields}&sort=-date_created`;

  const art: Art[] = await apiRequest(path);

  return Promise.all(
    art.map(async (item) => {
      return {
        ...item,
        year: parse(item.date_created, 'yyyy-mm-dd', new Date()).getFullYear(),
        file: {
          ...item.file,
          placeholder: await getBase64ImageUrl(item.file.id),
        },
        extra_files: await Promise.all(
          item.extra_files.map(async (extraFile) => {
            return {
              ...(await getFileInfo(
                extraFile.directus_files_id || extraFile.id,
              )),
              placeholder: await getBase64ImageUrl(
                extraFile.directus_files_id || extraFile.id,
              ),
            };
          }),
        ),
      };
    }),
  );
}

export async function getMovieReviews(): Promise<MovieReview[]> {
  const filter = '[status][_eq]=published';
  const fields = 'id,imdb_id,title,summary,date_watched,rating';
  const path = `/items/movie_review?filter${filter}&fields=${fields}&sort=-date_watched`;
  const reviews: MovieReview[] = await apiRequest(path);
  console.log(reviews)
  return reviews
}

async function apiRequest(path: string) {
  return await fetch(DIRECTUS + path)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}
