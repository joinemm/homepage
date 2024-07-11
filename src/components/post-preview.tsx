import Link from 'next/link';
import DateFormatter from './date-formatter';
import { MetaData } from '../util/posts';

type Props = {
  post: MetaData;
};

const PostPreview = ({ post }: Props) => {
  return (
    <article className="my-4">
      <div className="flex-grow">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:highlight font-bold no-underline underline-offset-4 hover:underline"
        >
          {post.title}
        </Link>
      </div>
      <div className="fg-muted mono flex items-baseline gap-2 text-sm">
        <DateFormatter dateString={post.date} formatter="LLL dd" />
        {'•'}
        <ul className="flex gap-2">
          {post.tags ? post.tags.map((tag) => <li key={tag}>#{tag}</li>) : null}
        </ul>
      </div>
    </article>
  );
};

export default PostPreview;
