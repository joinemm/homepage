import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../api/post-helpers';
import Head from 'next/head';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';
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
import Aside from '../../components/aside';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Note from '../../components/note';
import LikeButton from '../../components/like-button';

const components = {
  pre: (props) => {
    if (props.children?.type === 'code') {
      return <CodeBlock language={props['data-language']} prettyCode={props.children} />;
    } else {
      return <pre {...props} />;
    }
  },
  // extract images out of the p tags into their own component
  p: (props) => {
    if (props.children?.type === 'img') {
      return <MdxImage {...props.children.props} />;
    } else {
      return <p {...props} />;
    }
  },
  Aside: Aside,
  Note: Note,
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
        <meta name="description" content={metadata.excerpt} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.excerpt} key="twcard" />
        <meta name="twitter:creator" content="Joinemm" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content={`https://joinemm.dev${router.asPath}`} key="ogurl" />
        <meta property="og:image" content={`https://joinemm.dev${metadata.image}`} key="ogimage" />
        <meta property="og:site_name" content="joinemm.dev" key="ogsitename" />
        <meta property="og:title" content={metadata.title} key="ogtitle" />
        <meta property="og:description" content={metadata.excerpt} key="ogdesc" />
      </Head>
      <Header />
      <article className="m-auto max-w-3xl px-4 pt-8">
        <div className="flex justify-between">
          <Link href="/blog" className="flex items-center gap-2 underline-offset-4 hover:underline">
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
          <div className="flex justify-between">
            <ul className="mt-1 mb-8 flex gap-3">
              {metadata.tags
                ? metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        className="accent cursor-pointer hover:text-white"
                        href={`/blog?tag=${tag}`}
                      >
                        #{tag}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
            <LikeButton storageKey={`liked-blog-post-${metadata.slug}`} />
          </div>
          <div className="prose dark:prose-invert">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>
      </article>
      <footer className="py-32 text-center">
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <HiOutlineArrowNarrowUp className="m-auto" size={30} />
          <p className="fg-secondary pt-4 italic">go to top</p>
        </button>
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
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        [rehypePrettyCode, options],
        // idk why but ts likes to complain that this aint right even though it is
        // @ts-ignore
        [rehypeImgSize, { dir: 'public' }],
        rehypeKatex,
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
