const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      light_text: '#374151',
      dark_text: '#c0caf5',
      blue: '#7aa2f7',
      yellow: '#e0af68',
      green: '#9ece6a',
      red: '#f7768e',
      darkgrey: '#414868',
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            //** TODO: light mode */
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#374151',
            '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': theme('colors.pink[900]'),
            '--tw-prose-bold': theme('colors.pink[900]'),
            '--tw-prose-counters': theme('colors.pink[600]'),
            '--tw-prose-bullets': theme('colors.pink[400]'),
            '--tw-prose-hr': theme('colors.pink[300]'),
            '--tw-prose-quotes': theme('colors.darkgrey'),
            '--tw-prose-quote-borders': theme('colors.pink[300]'),
            '--tw-prose-captions': theme('colors.pink[700]'),
            '--tw-prose-code': theme('colors.pink[900]'),
            '--tw-prose-pre-code': theme('colors.pink[100]'),
            '--tw-prose-pre-bg': theme('colors.pink[900]'),
            '--tw-prose-th-borders': theme('colors.pink[300]'),
            '--tw-prose-td-borders': theme('colors.pink[200]'),
            '--tw-prose-invert-body': theme('colors.dark_text'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.yellow'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.dark_text'),
            '--tw-prose-invert-bullets': theme('colors.dark_text'),
            '--tw-prose-invert-hr': theme('colors.darkgrey'),
            '--tw-prose-invert-quotes': theme('colors.blue'),
            '--tw-prose-invert-quote-borders': theme('colors.transparent'),
            '--tw-prose-invert-captions': theme('colors.dark_text'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.white'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.white'),
            '--tw-prose-invert-td-borders': theme('colors.white'),
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
