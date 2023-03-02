import Header from '../../components/header';
import Head from 'next/head';
import MdxRenderer from '../../components/mdx-renderer';
import { getMdxContent } from '../../util/mdx';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Email from '../../components/encoded-email';
import MainContainer from '../../components/main-container';

type Props = {
  mdxAbout: MDXRemoteSerializeResult;
};

export default function About({ mdxAbout }: Props) {
  return (
    <>
      <Head>
        <title>About | joinemm.dev</title>
      </Head>
      <MainContainer>
        <h1 className="pb-4 text-3xl font-bold">About.</h1>
        <div className="prose dark:prose-invert">
          <MdxRenderer source={mdxAbout} />
          <p className="pt-8">
            Contact me: <Email encoded={'am9pbmVtbUBwbS5tZQ=='} />
          </p>
        </div>
      </MainContainer>
    </>
  );
}

export async function getStaticProps() {
  const mdx = await getMdxContent('about.mdx');
  return { props: { mdxAbout: mdx } };
}
