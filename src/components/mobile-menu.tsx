import { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import NavMenu from './nav-menu';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const allowScroll = () => {
    document.body.style.overflow = '';
    document.body.style.height = 'unset';
  };
  const lockSroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  };

  function openMenu() {
    setIsMenuOpen(true);
    lockSroll();
  }

  function closeMenu() {
    setIsMenuOpen(false);
    allowScroll();
  }

  useEffect(() => {
    return allowScroll;
  }, []);

  return (
    <>
      <button className="mr-2" type="button" onClick={openMenu}>
        <MdMenu size={35} />
      </button>
      {isMenuOpen && (
        <div className="bg-primary absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center">
          <button
            className="absolute right-4 top-4 z-50 mt-1"
            type="button"
            onClick={closeMenu}
          >
            <MdClose size={35} />
          </button>
          <NavMenu className="flex-col" />
        </div>
      )}
    </>
  );
}
