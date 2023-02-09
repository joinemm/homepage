import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import PostData from '../interfaces/post-data';
const postsDirectory = join(process.cwd(), 'content/blog');

/**
 * Gets all blog post slugs
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 * Gets a blog post by slug
 */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const metadata: PostData = {
    slug: realSlug,
    title: data['title'] || realSlug,
    date: data['date'] || '',
    image: data['image'] || '',
    excerpt: data['excerpt'] || '',
    tags: data['tags'] || [],
    draft: data['draft'] || false,
  };

  return { metadata, content };
}
/**
 * Gets all blog posts sorted by date
 */
export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.metadata.date > b.metadata.date ? -1 : 1));

  return posts;
}
