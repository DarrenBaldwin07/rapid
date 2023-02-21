const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = require("./");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        container: '100rem',
      },
      boxShadow: {
        'button-focus': '0 0 0 4px #C5C5C590',
        'button-focus2': '0 0 0 4px #99E7FF90',
        'invalid': '0 0 0 4px #E1000060'
      },
      borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        xl: '1rem',
        full: '9999px',
      },
      colors: {
        main: '#000000',
        hoverMain: '#323232',
        lightGrey: '#E0E0E0',
        secondaryGrey: '#C5C5C5',
        white: '#ffffff',
        hoverWhite: '#F6F6F6',
        danger: '#ef4444',
        hoverDanger: '#dc2626',
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
