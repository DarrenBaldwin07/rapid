const { rapidStyles, rapidTailwindTheme } = require("@rapid-web/ui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', rapidStyles],
  theme: rapidTailwindTheme,
  plugins: [],
}
