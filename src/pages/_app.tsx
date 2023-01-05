import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fira_Mono, IBM_Plex_Mono, Poppins, Raleway } from '@next/font/google';
const monospace_font = Fira_Mono({ subsets: ['latin'], weight: '400' });
const sans_font = Poppins({ subsets: ['latin'], weight: '400' });
const header_font = Raleway({ subsets: ['latin'], weight: '500' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --sans-font: ${sans_font.style.fontFamily};
          --mono-font: ${monospace_font.style.fontFamily};
          --header-font: ${header_font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
