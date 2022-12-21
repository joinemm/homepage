import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';
import MobileMenu from './mobile-menu';
import { Media } from '../lib/media';
import NavMenu from './nav-menu';

const Header = () => {
  return (
    <>
      <Media lessThan="md">
        <header className={styles.bio}>
          <div className={styles.headerStart}>
            <Link href="/" aria-label="Home">
              <Image
                src="/assets/avatar.png"
                alt="Me"
                width={40}
                height={40}
                className={styles.avatar}
              />
            </Link>
            <span className={styles.headerTitle}>Joinemm</span>
          </div>
          <Media at="xs">
            <MobileMenu />
          </Media>
          <Media at="sm">
            <NavMenu />
          </Media>
        </header>
      </Media>
      <Media greaterThanOrEqual="md">
        <header className={styles.bio}>
          <Link href="/" aria-label="Home">
            <Image
              src="/assets/avatar.png"
              alt="Me"
              width={100}
              height={100}
              className={styles.avatar}
            />
          </Link>

          <p>Hi welcome to Joinemm blog, where we discuss only topics of the utmost importance.</p>
          <NavMenu />
        </header>
      </Media>
    </>
  );
};

export default Header;
