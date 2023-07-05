import Link from 'next/link';

type Props = {
  className?: string;
  showHome?: boolean;
  currentPage?: string;
};

const NavMenu = ({ className = '', showHome = true, currentPage = "" }: Props) => {
  const links = [
    { label: './blog', href: '/blog' },
    // { label: 'projects', href: '/projects' },
    { label: './art', href: '/art' },
    { label: './reviews', href: '/reviews' },
    { label: './about', href: '/about' },
  ];
  return (
    <ul className={'flex items-center gap-4 ' + className}>
      {showHome && (
        <li>
          <Link
            className="hover:highlight underline-offset-4"
            href="/"
          >
            ~/
          </Link>
        </li>
      )}
      {links.map((link) => (
        <li key={link.label}>
          <Link
            className={
              'underline-offset-4 hover:highlight' +
              (currentPage == link.href ? ' font-bold no-underline' : '')
            }
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
