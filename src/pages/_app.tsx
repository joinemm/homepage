import '../styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import config from '../../next-seo.config';

const input_font = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Input/input-sans.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Input/input-sans-italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/assets/fonts/Input/input-sans-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Input/input-sans-bold-italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${input_font.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <DefaultSeo {...config} />
      <Component {...pageProps} />
    </>
  );
}
