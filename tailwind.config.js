const colors = require('./src/components/ui/theme/colors');

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
      inter: ['Inter', 'sans-serif'],
    },
    fontSize: {
      13: '13px',
    },
    screens: {
      sm: '360px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
