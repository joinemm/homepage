import PostType from '../interfaces/post-data';
import Link from 'next/link';
import DateFormatter from './date-formatter';
import LikeButton from './like-button';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  return (
    <article className="relative my-2 flex items-baseline">
      <div className="flex-shrink-0 flex-grow-0 basis-20 md:basis-28">
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
