import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto_Mono, Bodoni_Moda, Overpass_Mono } from '@next/font/google';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import config from '../../next-seo.config';

const mono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '600'] });
const serif = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
});
const overpass = Overpass_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-body: ${mono.style.fontFamily};
          --font-serif: ${serif.style.fontFamily};
          --font-mono: ${overpass.style.fontFamily};
        }
        body {
          font-family: var(--font-body);
        }
        .serif {
          font-family: var(--font-serif);
        }
        .mono {
          font-family: var(--font-mono);
        }
      `}</style>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
      </Head>
      <DefaultSeo {...config} />
      <Component {...pageProps} />
    </>
  );
}
