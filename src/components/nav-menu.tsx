import Link from 'next/link';

type Props = {
  className?: string;
};

const NavMenu = ({ className = '' }: Props) => {
  const links = [
    { label: 'about', href: '/about' },
    { label: 'blog', href: '/blog' },
    { label: 'reviews', href: '/reviews' },
    // { label: 'gallery', href: '/gallery' },
    { label: 'github', href: 'https://git.joinemm.dev' },
  ];
  return (
    <ul className={'flex items-center gap-4 ' + className}>
      {links.map((link) => (
        <li key={link.label} className="">
          <Link className="hover:fg-bright underline underline-offset-4" href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
