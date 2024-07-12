import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostPreview from '../../components/post-preview';
import MainContainer from '../../components/main-container';
import { parseJSON } from 'date-fns';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import { MdRssFeed } from 'react-icons/md';
import { getSortedPostsData, MetaData } from '../../util/posts';

type Props = {
  posts: MetaData[];
};

export default function Blog({ posts }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const router = useRouter();
  useEffect(() => {
    const query_tag = router.query.tag?.toString();

    if (query_tag !== undefined && activeTags.toString() !== [query_tag].toString()) {
      setActiveTags([query_tag]);
    }
    // have to disable this error because if I do as eslint wants this doesn't work
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const filterPosts = (posts: MetaData[]) => {
    const results = posts.filter(
      (post) =>
        activeTags.length == 0 || activeTags.every((t) => post.tags.includes(t)),
    );
    return results;
  };

  const groupByYear = (posts: MetaData[]) => {
    const years = posts.reduce((group, post) => {
      const year = parseJSON(post.date).getFullYear().toString();
      group[year] = group[year] ?? [];
      group[year].push(post);
      return group;
    }, {});

    return Object.keys(years)
      .map((year) => {
        return {
          year: year,
          posts: years[year] as MetaData[],
        };
      })
      .reverse();
  };

  return (
    <>
      <NextSeo
        title="BLOG"
        description="My blog for various interesting topics."
        canonical={DOMAIN + router.asPath}
      />
      <MainContainer classname="mt-0">
        <a
          href="/rss.xml"
          rel="noreferrer"
          target="_blank"
          className="hover:text-[#ee802f] dark:hover:text-[#ee802f] "
        >
          <MdRssFeed size="30" className="-ml-[4px]" />
        </a>
        {groupByYear(filterPosts(posts)).map(({ year, posts }) => {
          return (
            <div key={year} className="pb-4">
              <p className="fg-muted my-3 text-sm font-bold">{year}</p>
              {posts.map((post) => (
                <PostPreview post={post} key={post.slug} />
              ))}
            </div>
          );
        })}
      </MainContainer>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getSortedPostsData(true);

  return {
    props: {
      posts,
    },
  };
};
