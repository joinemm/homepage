import { useRouter } from 'next/router';
import { getPostBySlug, getAllPosts } from '../../util/post-helpers';
import { mdxSerialize } from '../../util/mdx';
import DateFormatter from '../../components/date-formatter';
import { PostData } from '../../util/post-helpers';
import Image from 'next/image';
import Link from 'next/link';
import { DOMAIN } from '../../util/constants';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxRenderer from '../../components/mdx-renderer';
import ScrollUpButton from '../../components/scroll-up-button';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import MainContainer from '../../components/main-container';
import { Heading } from '../../util/extract-headings';
import { Media } from '../../util/media-context';
import DisplayViews from '../../components/page-views';
import TOC from '../../components/toc';

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
          <TOC headings={toc} />
        </Media>
        <div>
          <h1 className="serif my-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {metadata.title}
          </h1>
          <div className="fg-muted mono flex flex-wrap gap-2 pb-8 text-[0.95rem]">
            <DateFormatter
              dateString={metadata.date}
              formatter="MMMM d, yyyy"
            ></DateFormatter>
            <DisplayViews slug={metadata.slug} />
            {'•'}
            <ul className="flex gap-2">
              {metadata.tags
                ? metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        className="accent hover:highlight cursor-pointer no-underline"
                        href={`/blog?tag=${tag}`}
                      >
                        #{tag}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
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
