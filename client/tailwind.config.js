/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5e6ad2',
          hover: '#828fff',
          active: '#5e69d1',
          soft: '#1c1e35',
          darkSoft: '#1c1e35'
        },
        canvas: {
          light: '#f7f8f8',
          dark: '#010102'
        },
        surface: {
          1: '#0f1011',
          2: '#141516',
          3: '#18191a',
          dark1: '#0f1011',
          dark2: '#141516',
          dark3: '#18191a'
        },
        ink: {
          DEFAULT: '#f7f8f8',
          muted: '#d0d6e0',
          subtle: '#8a8f98',
          disabled: '#62666d',
          dark: '#f7f8f8',
          darkMuted: '#d0d6e0',
          darkSubtle: '#8a8f98'
        },
        border: {
          DEFAULT: '#23252a',
          strong: '#34343a',
          dark: '#23252a',
          darkStrong: '#34343a'
        },
        helpdesk: {
          success: '#4cb782',
          warning: '#f2c94c',
          danger: '#eb5757',
          info: '#4ea7fc'
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace']
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '14px'
      }
    },
  },
  plugins: [],
}
