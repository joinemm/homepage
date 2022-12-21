import style from '../styles/blogpost.module.css';
import PostType from '../interfaces/post';
import Link from 'next/link';
import DateFormatter from './date-formatter';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`} className={style.previewContainer}>
      <div className={style.flexDate}>
        <DateFormatter dateString={post.date} />
      </div>
      <div className={style.flexSpacer}></div>
      <div className={style.flexTitle}>
        <h3>{post.title}</h3>
        <ul className={style.tags}>
          {post.tags ? post.tags.map((tag) => <li key={tag}>#{tag}</li>) : null}
        </ul>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
};

export default PostPreview;
