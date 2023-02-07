const { rapidStyles, rapidTailwindTheme, rapidPlugin } = require("@rapid-web/ui");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', rapidStyles],
  theme: rapidTailwindTheme,
  plugins: [rapidPlugin(
    {
      global: {
        'body': {
          backgroundColor: 'red'
        }
      }
    }
  )]
}
