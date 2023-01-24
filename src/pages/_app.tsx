import '../styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';

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
        :root {
          --sans-font: ${input_font.style.fontFamily};
          --mono-font: ${input_font.style.fontFamily};
          --header-font: ${input_font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
