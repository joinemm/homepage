import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  var pathElements = router.pathname.split('/');
  const basePath = pathElements[1];
  pathElements.pop();
  const prevPath = '/' + pathElements.pop();
  return (
    <header className="muted-border mono m-auto mb-2 mt-4 flex h-10 w-full max-w-[40rem]">
      <Media lessThan="mobile" className="my-auto w-full">
        <div className="ml-2 flex items-center justify-between gap-4">
          <Link className="min-w-0 no-underline" href={prevPath}>
            {prevPath === '/' ? (
              <div className="flex items-center">
                <p className="serif m-0 text-2xl tracking-widest">JOINEMM</p>
                <p className="m-0 pl-2">~{basePath}</p>
              </div>
            ) : (
              `..${prevPath}`
            )}
          </Link>
          <MobileMenu />
        </div>
      </Media>
      <Media greaterThanOrEqual="mobile" className="my-auto w-full">
        <NavMenu currentPage={'/' + basePath} />
      </Media>
    </header>
  );
};

export default Header;
