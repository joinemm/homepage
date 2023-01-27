/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              padding: 0,
            },
            code: {
              color: '#fff',
              backgroundColor: '#1f2937',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            a: {
              textUnderlineOffset: 4,
            },
            'a:hover': {
              color: '#f6c177',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
