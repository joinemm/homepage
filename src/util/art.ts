import { parse, parseJSON } from 'date-fns';
import fs from 'fs';
import path from 'path';

export type ArtMeta = {
  published: boolean;
  title: string;
  description?: string;
  medium?: string;
  date: string;
  year: number;
  files: [string];
};

const contentDirectory = path.join(process.cwd(), 'content');

export function getSortedArtworks(): ArtMeta[] {
  const dataPath = path.join(contentDirectory, 'artworks.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const artwork = data.map((art: ArtMeta) => {
    return {
      ...art,
      year: Number(art.date.split('-')[0]),
    };
  }) as ArtMeta[];

  // Sort posts by date
  return artwork.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
