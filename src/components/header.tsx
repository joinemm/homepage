import Image from 'next/image';
import MobileMenu from './mobile-menu';
import { Media } from '../api/media-context';
import NavMenu from './nav-menu';

const Header = () => {
  return (
    <>
      <Media lessThan="md">
        <header className="flex max-w-3xl text-center m-auto justify-between p-4 border-b-4 accent-border">
          <div className="flex gap-4 items-center">
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
        <header className="fixed w-80 text-right p-4 accent-border border-r-4 right-[calc(50%+384px)] top-8">
          <Image
            src="/assets/avatar.png"
            alt="Me"
            width={100}
            height={100}
            className="rounded-full inline-block"
          />

          <p className="py-4">
            Hi welcome to Joinemm blog, where we discuss only topics of the utmost importance.
          </p>
          <NavMenu />
        </header>
      </Media>
    </>
  );
};

export default Header;
