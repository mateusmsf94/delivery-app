/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#343434',
        lightgreen: '#2FC18C',
        darkgreen: '#036B52',
        lightgray: '#EAF1EF',
        purple: '#421981',
        blue: '#056CF9',
      },
    },
  },
  plugins: [],
};
