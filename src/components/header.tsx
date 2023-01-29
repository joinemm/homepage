import Image from 'next/image';
import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <>
      <Media lessThan="md">
        <header className="accent-border m-auto flex max-w-3xl justify-between border-b-4 p-4 text-center">
          <Link href="/" className="flex items-center gap-4">
            <Image src={avatar} alt="Me" width={40} height={40} className="rounded-full" />
            <p className="text-xl">Joinemm</p>
          </Link>
          <Media at="xs" className="my-auto">
            <MobileMenu />
          </Media>
          <Media at="sm" className="my-auto">
            <NavMenu />
          </Media>
        </header>
      </Media>
      <Media greaterThanOrEqual="md">
        {/* calc is equal to 50% + half of main content width */}
        <header className="accent-border fixed right-[calc(50%+384px)] top-8 max-w-xs border-r-4 p-4 text-right">
          <Link href="/" className="text-3xl">
            <Image
              src={avatar}
              alt="Me"
              width={100}
              height={100}
              className="inline-block rounded-full"
            />
            <p className="py-4">Joinemm</p>
          </Link>
          <NavMenu />
        </header>
      </Media>
    </>
  );
};

export default Header;
