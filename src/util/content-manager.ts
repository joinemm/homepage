import { parse } from 'date-fns';
import { CDN_DOMAIN } from './constants';

export type CMSImage = {
  id: string;
  width: number;
  height: number;
  title: string;
  placeholder?: string | null;
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

export type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  tags: [string];
  date_created: string;
  image?: CMSImage | null;
  content: string;
};

export type Page = {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  embed_image: string | null;
};

export async function getFileInfo(id: string): Promise<CMSImage> {
  return await apiRequest(`/files/${id}?fields=id,width,height,title`);
}

async function getBase64ImageUrl(id: string): Promise<string | null> {
  const url = getAssetUrl(id, 'loading');
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `data:image/webp;base64,${data}`;
}

export function getAssetUrl(
  assetUUID: string,
  transform: 'loading' | 'thumbnail' | 'orig' | 'header' | null = null,
): string {
  return (
    `https://${CDN_DOMAIN}/assets/${assetUUID}` + (transform ? `?key=${transform}` : '')
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
              ...(await getFileInfo(extraFile.directus_files_id || extraFile.id)),
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
  return reviews;
}

export async function getBlogPosts(draft: boolean = false): Promise<BlogPost[]> {
  const filter = draft ? null : '[status][_eq]=published';
  const fields = 'slug,title,excerpt,tags,date_created';
  const path = `/items/blog_post?filter${filter}&fields=${fields}&sort=-date_created`;
  const posts: BlogPost[] = await apiRequest(path);
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fields =
    'slug,title,excerpt,tags,date_created,content,image,image.id,image.width,image.height,image.title';
  const path = `/items/blog_post/${slug}?fields=${fields}&sort=-date_created`;
  const post: BlogPost = await apiRequest(path);

  if (!post) return undefined;

  return {
    ...post,
    image: post.image
      ? { ...post.image, placeholder: await getBase64ImageUrl(post.image.id) }
      : null,
  };
}

export async function getPage(slug: string): Promise<Page> {
  const path = `/items/page/${slug}`;
  const page: Page = await apiRequest(path);
  return page;
}

async function apiRequest(path: string) {
  return await fetch('https://' + CDN_DOMAIN + path, {
    cache: 'no-store',
    next: { revalidate: 0 },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}
