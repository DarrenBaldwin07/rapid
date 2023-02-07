const { rapidStyles, rapidTailwindTheme } = require("@rapid-web/ui");
const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', rapidStyles],
  theme: rapidTailwindTheme,
  plugins: []
}
