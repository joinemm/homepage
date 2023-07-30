import { useRouter } from 'next/router';
import { getPostBySlug, getAllPosts } from '../../util/post-helpers';
import { mdxSerialize } from '../../util/mdx';
import DateFormatter from '../../components/date-formatter';
import { PostData } from '../../util/post-helpers';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../../components/like-button';
import { DOMAIN, PAGE_WIDTH } from '../../util/constants';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxRenderer from '../../components/mdx-renderer';
import ScrollUpButton from '../../components/scroll-up-button';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import MainContainer from '../../components/main-container';
import { Heading } from '../../util/extract-headings';
import TOCLink from '../../components/toc-link';
import { Media } from '../../util/media-context';

type Props = {
  metadata: PostData;
  mdxSerialized: MDXRemoteSerializeResult;
  toc: Heading[];
};

export default function Post({ metadata, mdxSerialized, toc }: Props) {
  const router = useRouter();

  return (
    <>
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
        <Media greaterThanOrEqual="widescreen">
          <ul
            className="fixed top-1/2 ml-14 border-l-2"
            style={{
              transform: `translateX(${PAGE_WIDTH}rem) translateY(-50%)`,
            }}
          >
            {toc.map((heading) => (
              <TOCLink node={heading} key={heading.id} />
            ))}
          </ul>
        </Media>
        <div>
          <h1 className="my-2 text-4xl md:text-5xl font-bold leading-tight tracking-tight serif">
            {metadata.title}
          </h1>
          <div className="flex flex-wrap gap-2 fg-muted mono pb-8">
            <DateFormatter
              dateString={metadata.date}
              formatter="MMMM d, yyyy"
            ></DateFormatter>
            {'•'}
            <ul className="flex gap-2">
              {metadata.tags
                ? metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        className="accent no-underline cursor-pointer hover:highlight"
                        href={`/blog?tag=${tag}`}
                      >
                        #{tag}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
            <div className="hidden sm:block">
              <LikeButton storageKey={`liked-blog-post-${metadata.slug}`} />
            </div>
          </div>
          {metadata.image ? (
            <div className="">
              <Image
                // a little hack to make the nextjs Image height variable
                className="!relative !h-[unset] !w-full rounded-sm object-contain"
                src={metadata.image}
                alt="cover image"
                fill
              ></Image>
            </div>
          ) : null}
        </div>{' '}
        <MdxRenderer source={mdxSerialized} />
        <footer className="py-32 text-center">
          <ScrollUpButton />
        </footer>
      </MainContainer>
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
  const mdxResult = await mdxSerialize(post.content);
  return {
    props: {
      metadata: post.metadata,
      mdxSerialized: mdxResult.content,
      toc: mdxResult.toc,
    },
  };
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
