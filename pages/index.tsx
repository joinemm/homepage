import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Fira_Code } from '@next/font/google';
const font = Fira_Code({ subsets: ['latin'] });
import { Media, MediaContextProvider } from '../lib/media';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Joinemm</title>
        <meta name="description" content="Joinemm's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MediaContextProvider disableDynamicMediaQueries>
        <main className={`${styles.main} ${font.className}`}>
          <h1>
            <Link href="/blog">go to blog</Link>
          </h1>
          <p>sorry the main page is not implemented yet</p>
        </main>
      </MediaContextProvider>
    </>
  );
}
