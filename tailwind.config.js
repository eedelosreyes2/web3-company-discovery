module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '868px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '6xl': '1152px', // max-w-6xl
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
