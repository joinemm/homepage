import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';
import { PAGE_WIDTH } from '../util/constants';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <header className="m-auto w-full max-w-[720px] ">
      <div className="mb-8 mt-4 flex h-10 justify-between">
        <Link href="/" className="flex items-center">
          <p className="text-xl tracking-widest md:-mb-[2px]">Joinemm.</p>
        </Link>
        <Media lessThan="mobile" className="my-auto">
          <MobileMenu />
        </Media>
        <Media greaterThanOrEqual="mobile" className="my-auto">
          <NavMenu />
        </Media>
      </div>
    </header>
  );
};

export default Header;
