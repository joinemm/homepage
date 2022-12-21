import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { IBM_Plex_Mono } from '@next/font/google';
const font = IBM_Plex_Mono({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily}, monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
