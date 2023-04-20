const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        fullgallery: '900px',
        extrawide: '1100px',
      },
      colors: {
        light_text: '#374151',
        dark_text: '#c0caf5',
        blue: '#7aa2f7',
        yellow: '#e0af68',
        green: '#9ece6a',
        red: '#f7768e',
        darkgrey: '#414868',
        white: '#e5e5f8',
        lightgrey: '#636c95',
      },
      typography: (theme) => ({
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:first-of-type::after': {
              content: 'none',
            },
          },
        },
        DEFAULT: {
          css: {
            //** TODO: light mode */
            '--tw-prose-body': theme('colors.light_text'),
            '--tw-prose-headings': theme('colors.light_text'),
            '--tw-prose-lead': theme('colors.light_text'),
            '--tw-prose-links': theme('colors.light_text'),
            '--tw-prose-bold': theme('colors.light_text'),
            '--tw-prose-counters': theme('colors.light_text'),
            '--tw-prose-bullets': theme('colors.light_text'),
            '--tw-prose-hr': theme('colors.light_text'),
            '--tw-prose-quotes': theme('colors.lightgrey'),
            '--tw-prose-quote-borders': theme('colors.transparent'),
            '--tw-prose-captions': theme('colors.light_text'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': theme('colors.light_text'),
            '--tw-prose-td-borders': theme('colors.light_text'),
            '--tw-prose-invert-body': theme('colors.dark_text'),
            '--tw-prose-invert-headings': theme('colors.dark_text'),
            '--tw-prose-invert-lead': theme('colors.dark_text'),
            '--tw-prose-invert-links': theme('colors.yellow'),
            '--tw-prose-invert-bold': theme('colors.dark_text'),
            '--tw-prose-invert-counters': theme('colors.dark_text'),
            '--tw-prose-invert-bullets': theme('colors.dark_text'),
            '--tw-prose-invert-hr': theme('colors.darkgrey'),
            '--tw-prose-invert-quotes': theme('colors.lightgrey'),
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
            p: {
              lineHeight: 1.5,
            },
            code: {
              color: '#fff',
              backgroundColor: 'var(--tw-prose-pre-bg)',
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
              color: theme('colors.white'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
