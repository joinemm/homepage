import { getAllPosts } from '../../util/post-helpers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostData } from '../../util/post-helpers';
import PostPreview from '../../components/post-preview';
import MainContainer from '../../components/main-container';
import { parseISO } from 'date-fns';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';

type Props = {
  posts: [PostData];
  tags: [string];
};

export default function Blog({ posts, tags }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const router = useRouter();
  useEffect(() => {
    const query_tag = router.query.tag?.toString();

    if (
      query_tag !== undefined &&
      activeTags.toString() !== [query_tag].toString()
    ) {
      setActiveTags([query_tag]);
    }
    // have to disable this error because if I do as eslint wants this doesn't work
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const filterPosts = (posts: PostData[]) => {
    const results = posts.filter(
      (post) =>
        activeTags.length == 0 ||
        activeTags.every((t) => post.tags.includes(t)),
    );
    return results;
  };

  const groupByYear = (posts: PostData[]) => {
    const years = posts.reduce((group, post) => {
      const year = parseISO(post.date).getFullYear().toString();
      group[year] = group[year] ?? [];
      group[year].push(post);
      return group;
    }, {});

    return Object.keys(years)
      .map((year) => {
        return {
          year: year,
          posts: years[year] as PostData[],
        };
      })
      .reverse();
  };

  return (
    <>
      <NextSeo
        title="BLOG | Joinemm.dev"
        description="List of my blog posts"
        canonical={DOMAIN + router.asPath}
      />
      <MainContainer classname='border-t-2'>
        {groupByYear(filterPosts(posts)).map(({ year, posts }) => {
          return (
            <div key={year} className="pb-4">
              <p className="fg-muted text-sm font-bold">{year}</p>
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
  const allPosts = getAllPosts().filter((post) => !post.metadata.draft);

  return {
    props: {
      posts: allPosts.map((post) => post.metadata),
      tags: [...new Set(allPosts.map((post) => post.metadata.tags).flat(1))],
    },
  };
};
