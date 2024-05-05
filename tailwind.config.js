/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'var(--font-inter)',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgba(var(--color-accent) / <alpha-value>)',
        },
      },
      gridTemplateColumns: {
        layout: '1fr minmax(30px, 80rem) 1fr',
      },
      gridTemplateRows: {
        layout: '6rem minmax(calc(100vh - 12rem), 1fr) 6rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
