import { DOMAIN } from '../util/constants';
import MdxRenderer from './mdx-renderer';
import ScrollUpButton from './scroll-up-button';
import { NextSeo } from 'next-seo';
import MainContainer from './main-container';
import { Heading } from '../util/extract-headings';
import { Media } from '../util/media-context';
import TOC from './toc';
import { Page, getAssetUrl } from '../util/content-manager';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type Props = {
  page: Page;
  mdxSerialized: MDXRemoteSerializeResult;
  toc?: Heading[];
  embedImageId?: string | null;
  scrollUp?: boolean;
};

const MdxPage = ({ page, mdxSerialized, toc, embedImageId, scrollUp }: Props) => {
  return (
    <>
      <NextSeo
        title={`${page.title.toLowerCase()} ~ Joinemm.dev`}
        description={page.excerpt}
        canonical={DOMAIN + '/' + page.slug}
        openGraph={{
          title: page.title,
          description: page.excerpt,
          url: DOMAIN + '/' + page.slug,
          images: embedImageId
            ? [
                {
                  url: getAssetUrl(embedImageId, 'orig'),
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
