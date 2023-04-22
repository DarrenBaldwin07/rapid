import type { Config } from 'tailwindcss'
import { rapidStylesPath, rapidTailwindTheme, rapidPlugin } from "@rapid-web/ui";


export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}', rapidStylesPath],
    theme: {
        extend: rapidTailwindTheme({
            // Extend the default rapid tailwind theme here (documentation coming soon)
        })
    },
    plugins: [rapidPlugin({
        // Configure global styles variants here (documentation coming soon)
        global: {}
    })]
} satisfies Config
