import Header from '../../components/header';
import { getAllPosts } from '../../api/post-helpers';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostData from '../../interfaces/post-data';
import PostPreview from '../../components/post-preview';

type Props = {
  allPosts: [PostData];
};

export default function Blog({ allPosts }: Props) {
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

  return (
    <>
      <Header />
      <Head>
        <title>Blog | joinemm.dev</title>
      </Head>
      <article className="max-w-3xl m-auto mt-8 px-4">
        <h1 className="text-2xl font-bold pb-4">Blog.</h1>
        <ul className="flex gap-3">
          {allPosts
            .map((post) => post.tags)
            .flat(1)
            .map((tag) => (
              <li key={tag}>
                <a
                  className={
                    'cursor-pointer ' +
                    (activeTags.includes(tag)
                      ? 'border-b-2'
                      : 'text-[var(--accent-color)] hover:text-white')
                  }
                  onClick={() => {
                    if (activeTags.includes(tag)) {
                      setActiveTags(activeTags.filter((t) => t != tag));
                    } else {
                      setActiveTags(activeTags.concat(tag));
                    }
                  }}
                >
                  #{tag}
                </a>
              </li>
            ))}
        </ul>
        {allPosts
          .filter(
            (post) => activeTags.length == 0 || activeTags.every((t) => post.tags.includes(t)),
          )
          .map((post) => (
            <PostPreview post={post} key={post.slug} />
          ))}
      </article>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts: allPosts.map((post) => post.metadata) },
  };
};
