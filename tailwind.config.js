const colors = require('./src/components/ui/theme/colors');
const screens = require('./src/components/ui/theme/screens');

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
    },
    colors: colors,
    fontFamily: {
      inter: ['var(--font-inter)'],
      geologica: ['var(--font-geologica)'],
    },
    fontSize: {
      13: '13px',
    },
    screens,
  },
  plugins: [],
};
