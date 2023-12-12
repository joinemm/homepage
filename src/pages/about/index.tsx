import { mdxSerialize } from '../../util/mdx';
import { Page, getPage } from '../../util/content-manager';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxPage from '../../components/mdx-page';

type Props = {
  page: Page;
  mdxSerialized: MDXRemoteSerializeResult;
};

export default function About({ page, mdxSerialized }: Props) {
  return (
    <MdxPage
      page={page}
      mdxSerialized={mdxSerialized}
      embedImageId={page.embed_image}
      scrollUp={true}
    />
  );
}

export async function getStaticProps() {
  const page = await getPage('about');
  const mdxResult = await mdxSerialize(page.content);
  return {
    props: {
      page,
      mdxSerialized: mdxResult.content,
    },
  };
}
