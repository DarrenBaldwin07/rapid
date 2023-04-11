import type { Config } from 'tailwindcss'
import { rapidStylesPath, rapidTailwindTheme, rapidPlugin } from "@rapid-web/ui";

// Use this as your template paths directory if using nextjs app dir: "./app/**/*.{js,ts,jsx,tsx,mdx}",

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", rapidStylesPath],
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
