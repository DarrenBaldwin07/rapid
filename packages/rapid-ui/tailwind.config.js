const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = require("./");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
        maxWidth: {
          'container': '1600px'
        },
        boxShadow: {
            "button-focus": '0 0 0 5px #E0E0E090',
            "button-focus2": '0 0 0 5px #99E7FF90'
        },
        borderRadius: {
            'none': '0',
            'sm': '.125rem',
            DEFAULT: '.25rem',
            'lg': '.75rem',
            'xl': '1rem',
            'full': '9999px',
        },
        colors: {
            main: '#000000',
            hoverMain: '#323232',
            lightGrey: '#E0E0E0',
            secondaryGrey: '#C5C5C5',
            white: '#ffffff',
            hoverWhite: '#F6F6F6',
            danger: '#E10000',
        }
    }
  },
  plugins: [
    rapidPlugin(
      {
        global: {
          'body': {

          }
        }
      }
    )
  ],
}
