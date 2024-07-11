import { mdxSerialize } from '../../util/mdx';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxPage from '../../components/mdx-page';
import { getPageContent, MetaDataStub } from '../../util/posts';

type Props = {
  page: MetaDataStub;
  mdx: MDXRemoteSerializeResult;
};

export default function About({ page, mdx }: Props) {
  return <MdxPage page={page} mdxSerialized={mdx} scrollUp={true} />;
}

export async function getStaticProps() {
  const page = getPageContent('about');
  const mdxResult = await mdxSerialize(page.content);
  return {
    props: {
      page: page.metadata,
      mdx: mdxResult.content,
      toc: mdxResult.toc,
    },
  };
}
