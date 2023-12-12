import { mdxSerialize } from '../../util/mdx';
import { Heading } from '../../util/extract-headings';
import { Page, getPage } from '../../util/content-manager';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxPage from '../../components/mdx-page';

type Props = {
  page: Page;
  mdxSerialized: MDXRemoteSerializeResult;
  toc?: Heading[];
};

export default function Uses({ page, mdxSerialized, toc }: Props) {
  return (
    <MdxPage
      page={page}
      mdxSerialized={mdxSerialized}
      toc={toc}
      embedImageId={page.embed_image}
      scrollUp={true}
    />
  );
}

export async function getStaticProps() {
  const page = await getPage('uses');
  const mdxResult = await mdxSerialize(page.content);
  return {
    props: {
      page,
      mdxSerialized: mdxResult.content,
      toc: mdxResult.toc,
    },
  };
}
