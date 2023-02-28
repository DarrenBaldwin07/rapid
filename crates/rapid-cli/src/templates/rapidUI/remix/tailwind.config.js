const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = require("@rapid-web/ui");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', rapidStylesPath],

  theme: {
    extend: rapidTailwindTheme({
      // Extend the default rapid tailwind theme here (documentation coming soon)
    })
  },
  plugins: [rapidPlugin(
       // Configure global styles variants here (documentation coming soon)
  )],
}
