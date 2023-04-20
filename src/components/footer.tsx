import MobileMenu from './mobile-menu';
import { Media } from '../util/media-context';
import NavMenu from './nav-menu';
import Link from 'next/link';
import { PAGE_WIDTH } from '../util/constants';

const avatar = '/assets/avatar.jpg';

const Header = () => {
  return (
    <footer className="m-4 mt-8 text-center" style={{ maxWidth: PAGE_WIDTH }}>
      <p className="fg-muted text-sm">
        © Joonas Rautiola 2023 |{' '}
        <a href="https://git.joinemm.dev/homepage" className="hover:fg-primary">
          <strong>Source</strong>
        </a>
      </p>
    </footer>
  );
};

export default Header;
