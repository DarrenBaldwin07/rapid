import rapidUi from "@rapid-web/ui";
const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = rapidUi;
import { theme } from "./src/styles/rapidUI.config.ts";
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', rapidStylesPath],
  theme: {
    extend: rapidTailwindTheme({
        // Extend the default rapid tailwind theme here (documentation coming soon)
    })
  },
  plugins: [rapidPlugin(
   // Configure global styles variants here (documentation coming soon)
  )],
}
