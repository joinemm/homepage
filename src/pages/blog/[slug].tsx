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

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import 'katex/dist/katex.min.css';
import { getPostContent, getSortedPostsData, MetaData } from '../../util/posts';
import Comments from '../../components/comments';

type Props = {
  post: MetaData;
  mdx: MDXRemoteSerializeResult;
  toc: Heading[];
};

export default function Post({ mdx, toc, post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <></>;
  }

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        url={`${DOMAIN}/blog/${post.slug}`}
        title="Joinemm's Blog"
        images={post.image ? [DOMAIN + '/img/blog/' + post.image] : []}
        datePublished={post.date}
        authorName="Joinemm"
        description="My blog for various interesting topics."
      />
      <NextSeo
        title={`Joinemm :: ${post.title}`}
        description={post.abstract}
        canonical={DOMAIN + router.asPath}
        openGraph={{
          title: post.title,
          description: post.abstract,
          url: DOMAIN + router.asPath,
          type: 'article',
          article: {
            publishedTime: post.date,
            tags: post.tags,
          },
          images: post.image
            ? [
              {
                url: DOMAIN + '/img/blog/' + post.image,
                alt: post.image,
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
          <h1 className="serif text-4xl !leading-tight">{post.title}</h1>
          <div className="fg-muted mono flex flex-wrap gap-2 pb-4 text-[0.95rem]">
            <DateFormatter
              dateString={post.date}
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
              className="rounded-xl"
              src={'/img/blog/' + post.image}
              alt={post.image}
              width={720}
              height={0}
              priority
            ></Image>
          ) : null}
        </div>
        <MdxRenderer source={mdx} className="dropcap" />
        <footer className="py-16 text-center">
          <ScrollUpButton />
        </footer>
        <Comments
          repo="joinemm/homepage"
          repoId="R_kgDOIp8GkQ"
          category="Announcements"
          categoryId="DIC_kwDOIp8Gkc4CjuE4"
        />
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
  const { content, metadata } = getPostContent(slug);

  const mdxResult = await mdxSerialize(content);
  return {
    props: {
      mdx: mdxResult.content,
      toc: mdxResult.toc,
      post: metadata,
    },
  };
}

export async function getStaticPaths() {
  const posts = getSortedPostsData();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
