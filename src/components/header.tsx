import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <header className="muted-border m-auto mb-4 flex max-w-3xl justify-between border-b-2 pb-2 text-center">
      <Link href="/" className="flex items-center gap-4">
        <p className="-mb-[2px] text-xl tracking-widest">Joinemm.</p>
      </Link>
      <Media at="xs" className="my-auto">
        <MobileMenu />
      </Media>
      <Media greaterThanOrEqual="sm" className="mb-0 mt-auto">
        <NavMenu />
      </Media>
    </header>
  );
};

export default Header;
