export type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: [string];
  draft: boolean;
};

export type Media = {
  id: number;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
  formats: Record<string, any>;
};

export type Artwork = {
  id: number;
  title: string;
  description: string;
  date: string;
  media: Media[];
};
