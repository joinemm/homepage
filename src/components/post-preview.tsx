import { PostData } from '../util/types';
import Link from 'next/link';
import DateFormatter from './date-formatter';

type Props = {
  post: PostData;
};

const PostPreview = ({ post }: Props) => {
  return (
    <article className="relative my-2 flex items-baseline">
      <div className="flex-shrink-0 flex-grow-0 basis-20">
        <DateFormatter className="fg-secondary text-sm" dateString={post.date} formatter="LLL dd" />
      </div>
      <div className="flex-grow">
        <Link href={`/blog/${post.slug}`} className="hover:fg-bright underline underline-offset-4">
          {post.title}
        </Link>
      </div>
    </article>
  );
};

export default PostPreview;
