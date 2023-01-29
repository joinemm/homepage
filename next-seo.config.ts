import { DefaultSeoProps } from 'next-seo';
import { DOMAIN } from './src/util/constants';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: DOMAIN,
    siteName: 'Joinemm.dev',
    images: [
      {
        url: `${DOMAIN}/assets/content/lego-workers.jpg`,
        alt: 'Joinemm.dev',
      },
    ],
  },
  twitter: {
    handle: '@joinemm',
    site: 'Joinemm.dev',
    cardType: 'summary_large_image',
  },
};

export default config;
