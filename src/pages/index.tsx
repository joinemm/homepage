import Head from 'next/head';
import { MediaContextProvider } from '../util/media-context';
import Link from 'next/link';
import NavMenu from '../components/nav-menu';

export default function Home() {
  return (
    <>
      <MediaContextProvider disableDynamicMediaQueries>
        <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
          <Link href="/" className="mb-12 flex items-center gap-4">
            {/* <Image src={avatar} alt="Me" width={50} height={50} className="rounded-full" /> */}
            <div className="text-left">
              <p className="text-3xl tracking-widest">joinemm.</p>
              <p className="text-xs">keep it simple stupid</p>
            </div>
          </Link>
          <NavMenu className="flex-col" />
        </div>
      </MediaContextProvider>
    </>
  );
}
