import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import Head from 'next/head';
import { markdownToHtml } from '../../lib/api';
import type PostType from '../../interfaces/post';
import style from '../../styles/blog.module.css';
import BlogPost from '../../components/blog-post';
import Link from 'next/link';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
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
            <title>{post.title} | joinemm.dev</title>
            <meta property="og:image" content={post.image} />
          </Head>
          <article className={style.main}>
            <div className={style.postHeader}>
              <Link href="/blog">
                <ImArrowLeft2 size={20} /> All posts
              </Link>
              <div>
                <DateFormatter dateString={post.date}></DateFormatter> <MdDateRange size={20} />
              </div>
            </div>
            <BlogPost post={post}></BlogPost>
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
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'image',
    'tags',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
