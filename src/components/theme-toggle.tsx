import React from 'react';
import { useTheme } from 'next-themes';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const defaultTheme = 'dark';
  const currentTheme = theme === 'system' ? defaultTheme : theme;

  return (
    <button
      onClick={() => (currentTheme == 'dark' ? setTheme('light') : setTheme('dark'))}
      className="mt-1"
    >
      {currentTheme == 'dark' ? <MdDarkMode size={25} /> : <MdLightMode size={25} />}
    </button>
  );
};

export default ThemeToggler;
