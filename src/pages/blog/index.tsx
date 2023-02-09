import Header from '../../components/header';
import { getAllPosts } from '../../util/post-helpers';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostData from '../../interfaces/post-data';
import PostPreview from '../../components/post-preview';
import TagFilter from '../../components/tag-filter';

type Props = {
  posts: [PostData];
  tags: [string];
};

export default function Blog({ posts, tags }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const shrug = '¯\\_(ツ)_/¯';

  const router = useRouter();
  useEffect(() => {
    const query_tag = router.query.tag?.toString();

    if (query_tag !== undefined && activeTags.toString() !== [query_tag].toString()) {
      setActiveTags([query_tag]);
    }
    // have to disable this error because if I do as eslint wants this doesn't work
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const filterPosts = (posts: [PostData]) => {
    const results = posts.filter(
      (post) => activeTags.length == 0 || activeTags.every((t) => post.tags.includes(t)),
    );
    return results.length > 0 ? (
      results.map((post) => <PostPreview post={post} key={post.slug} />)
    ) : (
      <p className="pt-16 text-center">{shrug}</p>
    );
  };

  return (
    <>
      <Header />
      <Head>
        <title>Blog | joinemm.dev</title>
      </Head>
      <article className="m-auto mt-8 max-w-3xl px-4">
        <h1 className="pb-4 text-2xl font-bold">Blog.</h1>
        <p>This is my blog where I write about random stuff.</p>
        <TagFilter tags={tags} activeTags={activeTags} tagSetter={setActiveTags} />
        {filterPosts(posts)}
      </article>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts().filter((post) => !post.metadata.draft);

  return {
    props: {
      posts: allPosts.map((post) => post.metadata),
      tags: allPosts.map((post) => post.metadata.tags).flat(1),
    },
  };
};
