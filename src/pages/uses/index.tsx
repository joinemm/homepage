import { mdxSerialize } from '../../util/mdx';
import { Heading } from '../../util/extract-headings';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxPage from '../../components/mdx-page';
import { getPageContent, MetaDataStub } from '../../util/posts';

type Props = {
  page: MetaDataStub;
  mdx: MDXRemoteSerializeResult;
  toc?: Heading[];
};

export default function Uses({ page, mdx, toc }: Props) {
  return <MdxPage page={page} mdxSerialized={mdx} toc={toc} scrollUp={true} />;
}

export async function getStaticProps() {
  const page = getPageContent('uses');
  const mdxResult = await mdxSerialize(page.content);
  return {
    props: {
      page: page.metadata,
      mdx: mdxResult.content,
      toc: mdxResult.toc,
    },
  };
}
