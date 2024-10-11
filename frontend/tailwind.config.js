/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      dark: "rgba(var(--color-dark), <alpha-value>)",
      light: "rgba(var(--color-light), <alpha-value>)",
      accentDark: "rgba(var(--color-accentDark), <alpha-value>)",
      accentBright: "rgba(var(--color-accentBright), <alpha-value>)",
    },
    fontFamily: {
      display: ['"Playfair Display"'],
      body: ["Roboto"],
    },
  },
  plugins: [],
};
