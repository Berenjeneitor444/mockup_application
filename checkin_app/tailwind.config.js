/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/html/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      boxShadow: {
        b: '0px 10px 7px -1px rgba(0,0,0,0.17)',
      },
      colors: {
        primary: {
          50: '#f7f4ef',
          100: '#ece6d5',
          200: '#dacdae',
          300: '#c4ac80',
          400: '#b59461',
          500: '#a47e4e',
          600: '#886F46',
          700: '#714e37',
          800: '#604233',
          900: '#533a30',
          950: '#2f1e19',
        },
      },
      fontFamily: {
        body: ['Nunito Sans', 'Helvetica Neue', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
});
