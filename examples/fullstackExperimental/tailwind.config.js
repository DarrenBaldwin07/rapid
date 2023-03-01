import rapidUi from "@rapid-web/ui";
const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = rapidUi;
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@rapid-web/ui/src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: rapidTailwindTheme({
        // Extend the default rapid tailwind theme here (documentation coming soon)
    })
  },
  plugins: [rapidPlugin(
    {
      global: {
        'body': {

        }
      },
    }
   // Configure global styles variants here (documentation coming soon)
  )],
}
