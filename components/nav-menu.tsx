import styles from '../styles/header.module.css';
import Link from 'next/link';

const NavMenu = () => {
  return (
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
        <Link href="/portfolio">portfolio</Link>
      </li>
      <li>
        <Link href="/cv">cv</Link>
      </li>
    </ul>
  );
};

export default NavMenu;
