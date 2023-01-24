import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../api/post-helpers';
import Head from 'next/head';
import style from '../../styles/blog.module.css';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import { serialize } from 'next-mdx-remote/serialize';
import PostData from '../../interfaces/post-data';
import rehypePrettyCode from 'rehype-pretty-code';

import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import CodeBlock from '../../components/codeblock';
import options from '../../api/pretty-code-options';

const preToCodeBlock = (preProps) => {
  return;
};

const components = {
  pre: (preProps: any) => {
    console.log(preProps);
    // const props = preToCodeBlock(preProps);
    if (preProps.children?.type === 'code') {
      const props = {
        language: preProps['data-language'],
        prettyCode: preProps.children,
      };
      return <CodeBlock {...props} />;
    } else {
      return <pre {...preProps} />;
    }
  },
};

type Props = {
  metadata: PostData;
  mdxSource: MDXRemoteSerializeResult;
};

export default function Post({ metadata, mdxSource }: Props) {
  const router = useRouter();
  if (!router.isFallback && !metadata?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return router.isFallback ? (
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
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </article>
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
    mdxOptions: { development: false, rehypePlugins: [[rehypePrettyCode, options]] },
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
