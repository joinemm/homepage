import Link from 'next/link';

const NavMenu = () => {
  const links = [
    { label: 'home', href: '/' },
    { label: 'about', href: '/about' },
    { label: 'blog', href: '/blog' },
    { label: 'github', href: '/github' },
    { label: 'cv', href: '/cv' },
  ];
  return (
    <ul className="md:flex xl:block gap-8 items-center">
      {links.map((link) => (
        <li key={link.label} className="py-2">
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
