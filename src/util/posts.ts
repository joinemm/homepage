import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { formatISO } from 'date-fns';

export type MetaData = {
  slug: string;
  published: boolean;
  title: string;
  abstract?: string;
  date: string;
  tags: [string];
  image?: string;
};

export type MetaDataStub = {
  slug: string;
  title: string;
  abstract?: string;
  image?: string;
};

const contentDirectory = path.join(process.cwd(), 'content');

export function getSortedPostsData(published?: boolean): MetaData[] {
  // Get file names
  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const grayMatter = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...grayMatter.data,
        date: formatISO(grayMatter.data.date),
      } as MetaData;
    });

  // Sort posts by date
  const sorted = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  if (published !== undefined) {
    return sorted.filter((post) => post.published == published);
  }

  return sorted;
}

export function getPostContent(slug: string): { content: string; metadata: MetaData } {
  const fullPath = path.join(contentDirectory, slug + '.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const grayMatter = matter(fileContents);

  return {
    content: grayMatter.content,
    metadata: {
      slug,
      ...grayMatter.data,
      date: formatISO(grayMatter.data.date),
    } as MetaData,
  };
}

export function getPageContent(slug: string): {
  content: string;
  metadata: MetaDataStub;
} {
  const fullPath = path.join(contentDirectory, 'pages', slug + '.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const grayMatter = matter(fileContents);

  return {
    content: grayMatter.content,
    metadata: {
      slug,
      ...grayMatter.data,
    } as MetaDataStub,
  };
}
