/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
