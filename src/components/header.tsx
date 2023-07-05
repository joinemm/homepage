import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  var pathElements = router.pathname.split('/');
  const basePath = '/' + pathElements[1];
  pathElements.pop()
  const prevPath = "/" + pathElements.pop()
  return (
    <header className="muted-border m-auto mt-4 mb-4 w-full max-w-[720px] flex">
      <Media lessThan="mobile" className="my-auto">
        <div className="ml-2 flex h-10 items-center justify-between gap-4">
          <Link
            className="hover:fg-bright underline"
            href={prevPath}
          >
            {`..${prevPath}`}
          </Link>
          <MobileMenu />
        </div>
      </Media>
      <Media greaterThanOrEqual="mobile" className="my-auto">
        <NavMenu currentPage={basePath}/>
      </Media>
    </header>
  );
};

export default Header;
