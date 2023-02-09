import Head from 'next/head';
import { MediaContextProvider } from '../util/media-context';
import Link from 'next/link';
import NavMenu from '../components/nav-menu';

export default function Home() {
  return (
    <>
      <MediaContextProvider disableDynamicMediaQueries>
        <div className="flex h-screen w-screen items-center justify-center text-center">
          <NavMenu />
        </div>
      </MediaContextProvider>
    </>
  );
}
