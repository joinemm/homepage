import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import Head from 'next/head';
import style from '../../styles/blog.module.css';
import BlogPost from '../../components/blog-post';
import Link from 'next/link';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import { serialize } from 'next-mdx-remote/serialize';
import PostData from '../../interfaces/post-data';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type Props = {
  metadata: PostData;
  mdxSource: MDXRemoteSerializeResult;
};

export default function Post({ metadata, mdxSource }: Props) {
  const router = useRouter();
  if (!router.isFallback && !metadata?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Header />
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <Head>
            <title>{`${metadata.title} | joinemm.dev`}</title>
            <meta property="og:image" content={metadata.image} />
          </Head>
          <Header />
          <article className={style.main}>
            <div className={style.postHeader}>
              <Link href="/blog">
                <ImArrowLeft2 size={20} /> All posts
              </Link>
              <div>
                <DateFormatter dateString={metadata.date}></DateFormatter> <MdDateRange size={20} />
              </div>
            </div>
            <BlogPost metadata={metadata} mdxSource={mdxSource}></BlogPost>
          </article>
        </>
      )}
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);
  const mdxSource = await serialize(post.content, {
    mdxOptions: { development: false },
  });
  return { props: { metadata: post.metadata, mdxSource } };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.metadata.slug,
        },
      };
    }),
    fallback: false,
  };
}
