import PostType from '../interfaces/post-data';
import Link from 'next/link';
import DateFormatter from './date-formatter';
import LikeButton from './like-button';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  return (
    <article className="relative my-2 flex items-baseline border-cyan-500 max-xl:border-x-4 max-xl:px-4">
      <div className="flex-shrink-0 flex-grow-0 basis-28">
        <DateFormatter className="fg-secondary text-sm" dateString={post.date} formatter="LLL dd" />
      </div>
      <div className="flex-grow">
        <Link href={`/blog/${post.slug}`} className="hover:fg-bright underline underline-offset-4">
          {post.title}
        </Link>

        {/* <div className="flex flex-wrap gap-x-4">
          <ul className="flex flex-wrap gap-x-2">
            {post.tags
              ? post.tags.map((tag) => (
                  <li className="text-sm" key={tag}>
                    #{tag}
                  </li>
                ))
              : null}
          </ul>
        </div> */}
      </div>
    </article>
  );
};

export default PostPreview;
