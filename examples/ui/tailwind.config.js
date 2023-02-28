import rapidUi from "@rapid-web/ui";
const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = rapidUi;
import { theme } from "./src/styles/rapidUI.config.ts";
/** @type {import('tailwindcss').Config} */
export default {
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
      },
      theme
    }
  )],
}
