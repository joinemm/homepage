import Image from 'next/image';
import style from '../styles/blogpost.module.css';
import PostType from '../interfaces/post-data';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import PostData from '../interfaces/post-data';

const components = {};

const BlogPost = ({
  metadata,
  mdxSource,
}: {
  metadata: PostData;
  mdxSource: MDXRemoteSerializeResult;
}) => {
  return (
    <div>
      {metadata.image ? (
        <div className={style.coverImage}>
          <Image src={metadata.image} alt="cover image" fill={true}></Image>
        </div>
      ) : null}
      <h1 className={style.title}>{metadata.title}</h1>
      <ul className={style.tags}>
        {metadata.tags
          ? metadata.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog?tag=${tag}`}>#{tag}</Link>
              </li>
            ))
          : null}
      </ul>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export default BlogPost;
