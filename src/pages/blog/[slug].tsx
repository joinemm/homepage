import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../util/post-helpers';
import { mdxSerialize } from '../../util/mdx';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import PostData from '../../interfaces/post-data';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../../components/like-button';
import { DOMAIN } from '../../util/constants';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxRenderer from '../../components/mdx-renderer';
import ScrollUpButton from '../../components/scroll-up-button';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import Head from 'next/head';
import MainContainer from '../../components/main-container';

type Props = {
  metadata: PostData;
  mdxSerialized: MDXRemoteSerializeResult;
};

export default function Post({ metadata, mdxSerialized }: Props) {
  const router = useRouter();
  if (!router.isFallback && !metadata?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return router.isFallback ? (
    <h1>Loading…</h1>
  ) : (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
        />
      </Head>
      <ArticleJsonLd
        type="BlogPosting"
        url={`${DOMAIN}/blog/${metadata.slug}`}
        title="Joinemm's Blog"
        images={[DOMAIN + metadata.image]}
        datePublished={metadata.date}
        authorName="Joinemm"
        description="Welcome to my blog where I dump things from my brain."
      />
      <NextSeo
        title={`${metadata.title} | Joinemm.dev`}
        description={metadata.excerpt}
        canonical={DOMAIN + router.asPath}
        openGraph={{
          title: metadata.title,
          description: metadata.excerpt,
          url: DOMAIN + router.asPath,
          type: 'article',
          article: {
            publishedTime: metadata.date,
            tags: metadata.tags,
          },
          images: [
            {
              url: `${DOMAIN}/${metadata.image}`,
              alt: metadata.title,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <MainContainer>
        <div className="pb-8">
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
          <div className="flex justify-between">
            <ul className="mt-1 flex gap-3">
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
          <h1 className="fg-bright my-2 text-[2.5rem] font-bold leading-10 tracking-tight">
            {metadata.title}
          </h1>
          <DateFormatter className="fg-muted" dateString={metadata.date}></DateFormatter>{' '}
        </div>
        <MdxRenderer source={mdxSerialized} />
      </MainContainer>
      <footer className="py-32 text-center">
        <ScrollUpButton />
      </footer>
    </>
  );
}

type PathParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params: { slug } }: PathParams) {
  const post = getPostBySlug(slug);
  const mdxSerialized = await mdxSerialize(post.content);
  return { props: { metadata: post.metadata, mdxSerialized } };
}

export async function getStaticPaths() {
  const blogPosts = getAllPosts();

  const paths = blogPosts.map((post) => ({
    params: { slug: post.metadata.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
