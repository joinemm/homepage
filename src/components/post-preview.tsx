import PostType from '../interfaces/post-data';
import Link from 'next/link';
import DateFormatter from './date-formatter';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  return (
    <article className="accent-border-two my-6 border-l-4 pl-4">
      <Link href={`/blog/${post.slug}`} className="text-xl tracking-wide hover:underline">
        {post.title}
      </Link>

      <ul className="flex gap-2">
        <DateFormatter className="text-sm text-[var(--muted)]" dateString={post.date} />
        {post.tags
          ? post.tags.map((tag) => (
              <li className="text-sm" key={tag}>
                #{tag}
              </li>
            ))
          : null}
      </ul>
    </article>
  );
};

export default PostPreview;
