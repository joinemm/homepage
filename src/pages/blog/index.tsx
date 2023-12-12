import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostPreview from '../../components/post-preview';
import MainContainer from '../../components/main-container';
import { parseISO } from 'date-fns';
import { NextSeo } from 'next-seo';
import { DOMAIN } from '../../util/constants';
import { BlogPost, getBlogPosts } from '../../util/content-manager';

type Props = {
  posts: BlogPost[];
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

  const filterPosts = (posts: BlogPost[]) => {
    const results = posts.filter(
      (post) =>
        activeTags.length == 0 || activeTags.every((t) => post.tags.includes(t)),
    );
    return results;
  };

  const groupByYear = (posts: BlogPost[]) => {
    const years = posts.reduce((group, post) => {
      const year = parseISO(post.date_created).getFullYear().toString();
      group[year] = group[year] ?? [];
      group[year].push(post);
      return group;
    }, {});

    return Object.keys(years)
      .map((year) => {
        return {
          year: year,
          posts: years[year] as BlogPost[],
        };
      })
      .reverse();
  };

  return (
    <>
      <NextSeo
        title="blog ~ Joinemm.dev"
        description="List of my blog posts"
        canonical={DOMAIN + router.asPath}
      />
      <MainContainer>
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
  const posts = await getBlogPosts();

  return {
    props: {
      posts: posts,
    },
  };
};
