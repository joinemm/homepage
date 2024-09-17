import { DOMAIN } from '../util/constants';
import MdxRenderer from './mdx-renderer';
import ScrollUpButton from './scroll-up-button';
import { NextSeo } from 'next-seo';
import MainContainer from './main-container';
import { Heading } from '../util/extract-headings';
import { Media } from '../util/media-context';
import TOC from './toc';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MetaDataStub } from '../util/posts';

type Props = {
  page: MetaDataStub;
  mdxSerialized: MDXRemoteSerializeResult;
  toc?: Heading[];
  scrollUp?: boolean;
};

const MdxPage = ({ page, mdxSerialized, toc, scrollUp }: Props) => {
  return (
    <>
      <NextSeo
        title={`Joinemm :: ${page.title}`}
        description={page.abstract}
        canonical={DOMAIN + '/' + page.slug}
        openGraph={{
          title: page.title,
          description: page.abstract,
          url: DOMAIN + '/' + page.slug,
          images: page.image
            ? [
                {
                  url: '/img/' + page.image,
                  alt: page.title,
                },
              ]
            : [],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <MainContainer>
        {toc && (
          <Media greaterThanOrEqual="widescreen">
            <TOC headings={toc} />
          </Media>
        )}
        <MdxRenderer source={mdxSerialized} />
        {scrollUp && (
          <footer className="py-32 text-center">
            <ScrollUpButton />
          </footer>
        )}
      </MainContainer>
    </>
  );
};

export default MdxPage;
