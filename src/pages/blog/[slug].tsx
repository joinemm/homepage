import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../api/post-helpers';
import Head from 'next/head';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import { serialize } from 'next-mdx-remote/serialize';
import PostData from '../../interfaces/post-data';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeImgSize from 'rehype-img-size';

import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import CodeBlock from '../../components/codeblock';
import options from '../../api/pretty-code-options';
import MdxImage from '../../components/mdx-image';

const components = {
  pre: (props) => {
    if (props.children?.type === 'code') {
      return <CodeBlock language={props['data-language']} prettyCode={props.children} />;
    } else {
      return <pre {...props} />;
    }
  },
  img: MdxImage,
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
      <article className="m-auto max-w-3xl px-4 pt-8">
        <div className="flex justify-between">
          <Link href="/blog" className="flex items-center gap-2">
            <ImArrowLeft2 size={20} className="inline-block" />
            <p>All posts</p>
          </Link>
          <div className="flex items-center gap-2">
            <DateFormatter dateString={metadata.date}></DateFormatter>{' '}
            <MdDateRange size={20} className="inline-block" />
          </div>
        </div>
        <div className="pt-4">
          {metadata.image ? (
            <div className="">
              <Image
                // a little hack to make the nextjs Image height variable
                className="!relative !h-[unset] !w-full rounded-lg object-contain"
                src={metadata.image}
                alt="cover image"
                fill={true}
              ></Image>
            </div>
          ) : null}
          <h1 className="mt-4 border-b-2 pb-4 text-4xl font-bold">{metadata.title}</h1>
          <ul className="mt-1 mb-8 flex gap-3">
            {metadata.tags
              ? metadata.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      className="cursor-pointer text-[var(--accent-color)] hover:text-white"
                      href={`/blog?tag=${tag}`}
                    >
                      #{tag}
                    </Link>
                  </li>
                ))
              : null}
          </ul>
          <div className="prose dark:prose-invert">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>
      </article>
      <footer className="py-32 text-center">
        <p className="italic text-[var(--muted)]">fin</p>
      </footer>
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
    mdxOptions: {
      development: false,
      remarkPlugins: [],
      rehypePlugins: [
        [rehypePrettyCode, options],
        // @ts-ignore
        [rehypeImgSize, { dir: 'public' }],
      ],
    },
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
