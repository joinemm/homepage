import { useState, useEffect } from 'react';
import styles from '../styles/mobile-menu.module.css';
import { MdMenu, MdClose } from 'react-icons/md';
import NavMenu from './nav-menu';

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
        <MdMenu size={30} />
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <button className={styles.burger} type="button" onClick={closeMenu}>
            <MdClose size={30} />
          </button>
          <NavMenu />
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
