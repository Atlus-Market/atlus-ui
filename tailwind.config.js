/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      'orange': 'var(--color-orange)',
      'peach': 'var(--color-peach)',
      'off-white': 'var(--color-off-white)',
      'white': 'var(--color-white)',
      'soft-black': 'var(--color-soft-black)',
      'red': 'var(--color-red)',
      'lightest-grey': 'var(--color-lightest-grey)',
      'light-grey': 'var(--color-light-grey)',
      'middle-grey': 'var(--color-middle-grey)',
      'dark-grey': 'var(--color-dark-grey)',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    }
  },
  plugins: [],
}
