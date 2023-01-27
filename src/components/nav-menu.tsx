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
    <ul className="items-center gap-8 md:flex xl:block">
      {links.map((link) => (
        <li key={link.label} className="py-2 ">
          <Link className="underline-offset-4 hover:underline" href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
