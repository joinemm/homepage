import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fira_Code } from '@next/font/google';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import config from '../../next-seo.config';

const mono = Fira_Code({ subsets: ['latin'], weight: ['400', '600'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${mono.style.fontFamily};
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
