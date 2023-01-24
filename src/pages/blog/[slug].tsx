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
      <article className="max-w-3xl m-auto pt-8 px-4">
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
                className="object-contain rounded-lg !relative !w-full !h-[unset]"
                src={metadata.image}
                alt="cover image"
                fill={true}
              ></Image>
            </div>
          ) : null}
          <h1 className="text-4xl font-bold border-b-2 mt-4 pb-4">{metadata.title}</h1>
          <ul className="flex gap-3 mt-1 mb-8">
            {metadata.tags
              ? metadata.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      className="text-[var(--accent-color)] hover:text-white cursor-pointer"
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
      <footer className="text-center py-32">
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
