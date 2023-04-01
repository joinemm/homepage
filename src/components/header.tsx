import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <header className="muted-border m-auto mb-8 flex h-10 max-w-[768px] justify-between text-center">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-xl tracking-widest md:-mb-[2px]">Joinemm.</p>
      </Link>
      <Media lessThan="mobile" className="my-auto">
        <MobileMenu />
      </Media>
      <Media greaterThanOrEqual="mobile" className="my-auto">
        <NavMenu />
      </Media>
    </header>
  );
};

export default Header;
