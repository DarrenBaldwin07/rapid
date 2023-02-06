const { rapidStyles, rapidTheme } = require("@rapid-web/ui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', rapidStyles],
  theme: rapidTheme,
  plugins: [],
}
