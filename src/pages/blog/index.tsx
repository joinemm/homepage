import Header from '../../components/header';
import { getAllPosts } from '../../api/post-helpers';
import Head from 'next/head';
import style from '../../styles/blog.module.css';
import PostPreview from '../../components/post-preview';
import { useEffect, useState } from 'react';
import MobileMenu from '../../components/mobile-menu';
import { useRouter } from 'next/router';
import PostData from '../../interfaces/post-data';

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
    // have to disable this error because if I do as it wants this doesn't work
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <Header />
      <Head>
        <title>Blog | joinemm.dev</title>
      </Head>
      <article className={style.main}>
        <h1 className={style.maintitle}>Blog.</h1>
        <ul className={style.tags}>
          {allPosts
            .map((post) => post.tags)
            .flat(1)
            .map((tag) => (
              <li key={tag}>
                <a
                  className={`${style.tagButton} ${activeTags.includes(tag) ? style.active : ''}`}
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
