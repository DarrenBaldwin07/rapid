const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = require("@rapid-web/ui");
const { theme } = require("./src/styles/rapidUI.config.mts");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@rapid-web/ui/src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: rapidTailwindTheme({
      // We can extend the base rapidtailwind theme here
    })
  },
  plugins: [rapidPlugin(
    {
      global: {
        'body': {

        }
      }
    }
  )],
}
