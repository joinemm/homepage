export type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: [string];
  draft: boolean;
};

export type Artwork = {
  id: number;
  title: string;
  description: string;
  date: string;
  media: {
    id: number;
    url: string;
    formats: Record<string, any>;
  }[];
};
