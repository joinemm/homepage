import Image from 'next/image';
import MobileMenu from './mobile-menu';
import { Media } from '../api/media-context';
import NavMenu from './nav-menu';

const Header = () => {
  return (
    <>
      <Media lessThan="md">
        <header className="accent-border m-auto flex max-w-3xl justify-between border-b-4 p-4 text-center">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/avatar.png"
              alt="Me"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="text-xl">Joinemm</h2>
          </div>
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
          <Image
            src="/assets/avatar.png"
            alt="Me"
            width={100}
            height={100}
            className="inline-block rounded-full"
          />

          <p className="py-4 text-3xl">Joinemm</p>
          <NavMenu />
        </header>
      </Media>
    </>
  );
};

export default Header;
