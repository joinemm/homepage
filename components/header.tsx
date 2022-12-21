import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';
import MobileMenu from './mobile-menu';
import { useMediaQuery } from 'react-responsive';
import { Context as ResponsiveContext } from 'react-responsive';
import { Media, MediaContextProvider } from '../lib/media';

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
            <span className={styles.headerTitle}>Joinemm.dev</span>
          </div>
          <Media at="xs">
            <MobileMenu />
          </Media>
          <Media at="sm">
            <ul className={styles.nav}>
              <li>
                <Link href="/about">home</Link>
              </li>
              <li>
                <Link href="/about">about</Link>
              </li>
              <li>
                <Link href="/blog">blog</Link>
              </li>
              <li>
                <Link href="/portfolio">github</Link>
              </li>
              <li>
                <Link href="/cv">cv</Link>
              </li>
            </ul>
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

          <p>Hi welcome to Joinemm blog where we discuss only topics of utmost importance</p>
          <ul className={styles.nav}>
            <li>
              <Link href="/about" aria-label="About me">
                home
              </Link>
            </li>
            <li>
              <Link href="/about" aria-label="About me">
                about
              </Link>
            </li>
            <li>
              <Link href="/blog" aria-label="About me">
                blog
              </Link>
            </li>
            <li>
              <Link href="/portfolio" aria-label="About me">
                github
              </Link>
            </li>
            <li>
              <Link href="/cv" aria-label="About me">
                cv
              </Link>
            </li>
          </ul>
        </header>
      </Media>
    </>
  );
};

export default Header;
