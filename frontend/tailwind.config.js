/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "rgba(var(--color-primary), <alpha-value>)",
      secondary: "rgba(var(--color-secondary), <alpha-value>)",
      accent: "rgba(var(--color-accent), <alpha-value>)",
      accent2: "rgba(var(--color-accent2), <alpha-value>)",
      accent3: "rgba(var(--color-accent3), <alpha-value>)",
    },
    fontFamily: {
      display: ['"Playfair Display"'],
      body: ["Roboto"],
    },
  },
  plugins: [],
};
