/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/**.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xl: "1000px",
        l: "800px",
        sm: "600px",
        xsm: "400px",
      },
    },
    fontFamily: {
      myFont: ["Roboto"],
    },
  },
  plugins: [],
};
