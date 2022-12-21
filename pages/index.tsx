import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Fira_Code } from '@next/font/google';
const font = Fira_Code({ subsets: ['latin'] });
import { Media, MediaContextProvider } from '../lib/media';

export default function Home() {
  return (
    <>
      <Head>
        <title>Joinemm.dev</title>
        <meta name="description" content="Joinemm's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MediaContextProvider disableDynamicMediaQueries>
        <main className={`${styles.main} ${font.className}`}>
          <div className={styles.description}>
            <p>
              Get started by editing&nbsp;
              <code className={styles.code}>pages/index.tsx</code>
            </p>
          </div>
        </main>
      </MediaContextProvider>
    </>
  );
}
