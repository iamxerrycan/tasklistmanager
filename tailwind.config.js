/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      borderRadius: {
        'xl-custom': '0.50rem', 
      },
    },
  },
  plugins: [],
};

