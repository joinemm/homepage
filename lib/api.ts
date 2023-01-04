import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import PostData from '../interfaces/post-data';

const postsDirectory = join(process.cwd(), 'posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const metadata: PostData = {
    slug: realSlug,
    title: data['title'] || 'No Title Specified',
    date: data['date'] || '',
    image: data['image'] || '',
    author: data['author'] || 'No author specified',
    excerpt: data['excerpt'] || '...',
    tags: data['tags'] || [],
  };

  return { metadata, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));

  return posts;
}
