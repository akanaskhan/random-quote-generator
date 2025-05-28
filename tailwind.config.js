const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor: "var(--bs-themeColor)",
        darkgray: "var(--bs-dark)",
        lightgray: "var(--bs-lightgray)",
        blackColor: "var(--bs-black)",
        whiteColor: "var(--bs-white)",
        greenColor: "var(--bs-GreenColor)",
        lightGreenColor: "var(--bs-LightGreenColor)",
        themeGray: "var(--bs-themeGray)",
        
      },
      fontFamily: {
        Urbanist: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.themeText': { color: 'var(--bs-themeColor) !important' },
        '.greenText': { color: 'var(--bs-GreenColor) !important' },
        '.whiteText': { color: 'var(--bs-white) !important' },
        '.blackText': { color: 'var(--bs-black) !important' },
        '.grayText': { color: 'var(--bs-themeGray) !important' },
      })
    })
  ]
};
