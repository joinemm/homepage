import { DefaultSeoProps } from 'next-seo';
import { DOMAIN } from './src/util/constants';

const config: DefaultSeoProps = {
  title: 'Joinemm',
  description: "Joinemm's website",
  canonical: DOMAIN,
  openGraph: {
    title: 'Joinemm',
    description: "Joinemm's website",
    type: 'website',
    locale: 'en_US',
    url: DOMAIN,
    siteName: 'Joinemm.dev',
    images: [
      {
        url: `${DOMAIN}/assets/avatar.jpg`,
        width: 72,
        height: 72,
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
