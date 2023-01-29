import { DefaultSeoProps } from 'next-seo';
import { DOMAIN } from './src/util/constants';

const config: DefaultSeoProps = {
  title: 'Joinemm.dev',
  description: "Joinemm's website",
  canonical: DOMAIN,
  openGraph: {
    title: 'Joinemm.dev',
    description: "Joinemm's awesome website",
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
    cardType: 'summary',
  },
};

export default config;
