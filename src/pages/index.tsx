import Head from 'next/head';
import { MediaContextProvider } from '../api/media-context';
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
        <main className="prose dark:prose-invert m-auto text-center pt-16">
          <h1>
            <Link href="/blog">go to blog</Link>
          </h1>
          <p>sorry the main page is not implemented yet</p>
        </main>
      </MediaContextProvider>
    </>
  );
}
