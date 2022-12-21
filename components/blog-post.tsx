import Image from 'next/image';
import style from '../styles/blogpost.module.css';
import PostType from '../interfaces/post';
import Link from 'next/link';

type Props = {
  post: PostType;
};

const BlogPost = ({ post }: Props) => {
  return (
    <div>
      {post.image ? (
        <div className={style.coverImage}>
          <Image src={post.image} alt="cover image" fill={true}></Image>
        </div>
      ) : null}
      <h1 className={style.title}>{post.title}</h1>
      <ul className={style.tags}>
        {post.tags
          ? post.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog?tag=${tag}`}>#{tag}</Link>
              </li>
            ))
          : null}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogPost;
