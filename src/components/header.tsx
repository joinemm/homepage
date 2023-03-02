import Image from 'next/image';
import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <header className="muted-border m-auto mb-4 flex max-w-3xl justify-between border-b-2 py-4 text-center">
      <Link href="/" className="flex items-center gap-4">
        {/* <Image src={avatar} alt="Me" width={50} height={50} className="rounded-full" /> */}
        <div className="text-left">
          <p className="text-3xl tracking-widest">joinemm.</p>
          <p className="text-xs">keep it simple stupid</p>
        </div>
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
