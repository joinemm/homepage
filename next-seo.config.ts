import { DefaultSeoProps } from 'next-seo';
import { DOMAIN } from './src/util/constants';

const config: DefaultSeoProps = {
  title: 'Joinemm.dev',
  description: 'Personal website and blog',
  canonical: DOMAIN,
  openGraph: {
    siteName: 'Joinemm.dev',
    title: 'Joinemm.dev',
    description: 'Personal website and blog',
    type: 'website',
    locale: 'en_US',
    url: DOMAIN,
    images: [
      {
        url: `${DOMAIN}/assets/content/lego-workers.jpg`,
        alt: 'Joinemm.dev',
      },
    ],
  },
  twitter: {
    handle: '@joinemm',
    cardType: 'summary_large_image',
  },
};

export default config;
