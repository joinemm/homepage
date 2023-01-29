import Header from '../../components/header';
import Head from 'next/head';
import MdxRenderer from '../../components/mdx-renderer';
import { getMdxContent } from '../../util/mdx';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type Props = {
  mdxAbout: MDXRemoteSerializeResult;
};

export default function About({ mdxAbout }: Props) {
  return (
    <>
      <Header />
      <Head>
        <title>About | joinemm.dev</title>
      </Head>
      <article className="m-auto mt-8 max-w-3xl px-4">
        <h1 className="pb-4 text-2xl font-bold">About.</h1>
        <div className="prose dark:prose-invert">
          <MdxRenderer source={mdxAbout} />
        </div>
      </article>
    </>
  );
}

export async function getStaticProps() {
  const mdx = await getMdxContent('about.mdx');
  return { props: { mdxAbout: mdx } };
}
