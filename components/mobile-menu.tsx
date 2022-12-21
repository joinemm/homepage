import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/mobile-menu.module.css';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openMenu() {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  }

  function closeMenu() {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
    document.body.style.height = 'unset';
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
      document.body.style.height = 'unset';
    };
  }, []);

  return (
    <>
      <button className={styles.burger} type="button" onClick={openMenu}>
        <MenuIcon />
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <button className={styles.burger} type="button" onClick={closeMenu}>
            <CrossIcon />
          </button>
          <ul className={styles.nav}>
            <li>
              <Link href="/" aria-label="About me">
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
                portfolio
              </Link>
            </li>
            <li>
              <Link href="/cv" aria-label="About me">
                cv
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
