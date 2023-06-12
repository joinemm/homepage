import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';
import { PAGE_WIDTH } from '../util/constants';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <header className="muted-border m-auto mt-4 mb-4 w-full max-w-[720px] border-b-4 pb-4">
      <Media lessThan="mobile" className="my-auto">
        <div className="ml-2 flex h-10 items-center justify-between gap-4">
          <Link
            className="hover:fg-bright underline underline-offset-4"
            href="/"
          >
            ~/joinemm
          </Link>
          <MobileMenu />
        </div>
      </Media>
      <Media greaterThanOrEqual="mobile" className="my-auto">
        <NavMenu />
      </Media>
    </header>
  );
};

export default Header;
