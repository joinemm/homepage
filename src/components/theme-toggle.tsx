import React from 'react';
import { useTheme } from 'next-themes';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? 'dark' : theme;

  return (
    <button
      onClick={() => (currentTheme == 'dark' ? setTheme('light') : setTheme('dark'))}
      className="mt-1"
      aria-label="toggle theme"
    >
      {currentTheme == 'dark' ? <MdDarkMode size={25} /> : <MdLightMode size={25} />}
    </button>
  );
};

export default ThemeToggler;
