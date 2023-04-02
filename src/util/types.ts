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
  placeholder: string;
};

export type Artwork = {
  id: number;
  title: string;
  year: number;
  media: Media[];
};
