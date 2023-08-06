import { useRouter } from 'next/router';
import { mdxSerialize } from '../../util/mdx';
import DateFormatter from '../../components/date-formatter';
import Image from 'next/image';
import Link from 'next/link';
import { DOMAIN } from '../../util/constants';
import MdxRenderer from '../../components/mdx-renderer';
import ScrollUpButton from '../../components/scroll-up-button';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import MainContainer from '../../components/main-container';
import { Heading } from '../../util/extract-headings';
import { Media } from '../../util/media-context';
import DisplayViews from '../../components/page-views';
import TOC from '../../components/toc';
import {
  BlogPost,
  getAssetUrl,
  getBlogPosts,
  getPostBySlug,
} from '../../util/content-manager';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type Props = {
  post: BlogPost;
  mdxSerialized: MDXRemoteSerializeResult;
  toc: Heading[];
};

export default function Post({ post, mdxSerialized, toc }: Props) {
  const router = useRouter();

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        url={`${DOMAIN}/blog/${post.slug}`}
        title="Joinemm's Blog"
        images={post.image ? [getAssetUrl(post.image.id, 'header')] : []}
        datePublished={post.date_created}
        authorName="Joinemm"
        description="Welcome to my blog where I dump things from my brain."
      />
      <NextSeo
        title={`${post.title} | Joinemm.dev`}
        description={post.excerpt}
        canonical={DOMAIN + router.asPath}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: DOMAIN + router.asPath,
          type: 'article',
          article: {
            publishedTime: post.date_created,
            tags: post.tags,
          },
          images: post.image
            ? [
                {
                  url: getAssetUrl(post.image.id, 'header'),
                  alt: post.title,
                },
              ]
            : [],
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
            {post.title}
          </h1>
          <div className="fg-muted mono flex flex-wrap gap-2 pb-8 text-[0.95rem]">
            <DateFormatter
              dateString={post.date_created}
              formatter="MMMM d, yyyy"
            ></DateFormatter>
            <DisplayViews slug={post.slug} />
            {'•'}
            <ul className="flex gap-2">
              {post.tags
                ? post.tags.map((tag) => (
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
          {post.image ? (
            <Image
              className="rounded-sm"
              src={getAssetUrl(post.image.id, 'header')}
              alt={post.image.title}
              placeholder={post.image.placeholder ? 'blur' : undefined}
              blurDataURL={post.image.placeholder || undefined}
              width={post.image.width}
              height={post.image.height}
            ></Image>
          ) : null}
        </div>
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
  const post = await getPostBySlug(slug);
  const mdxResult = await mdxSerialize(post.content);
  return {
    props: {
      post: post,
      mdxSerialized: mdxResult.content,
      toc: mdxResult.toc,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getBlogPosts(true);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
