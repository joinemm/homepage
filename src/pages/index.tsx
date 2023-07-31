import { MediaContextProvider } from '../util/media-context';
import NavMenu from '../components/nav-menu';

export default function Home() {
  return (
    <>
      <MediaContextProvider disableDynamicMediaQueries>
        <div className="mono flex h-screen w-screen flex-col items-center justify-center text-center">
          <h2 className="absolute top-20 pb-4">Joinemm.dev</h2>
          <NavMenu className="flex-col" showHome={false} />
        </div>
      </MediaContextProvider>
    </>
  );
}
