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
          hover: '#4f5bc4',
          active: '#454fae',
          soft: '#eef0ff',
          darkSoft: '#202541'
        },
        canvas: {
          light: '#f7f8fa',
          dark: '#0b0c0e'
        },
        surface: {
          1: '#ffffff',
          2: '#f9fafb',
          3: '#f1f3f5',
          dark1: '#111315',
          dark2: '#17191c',
          dark3: '#1d2024'
        },
        ink: {
          DEFAULT: '#17181a',
          muted: '#5f6368',
          subtle: '#7b8088',
          disabled: '#a5a9b0',
          dark: '#f5f7f8',
          darkMuted: '#b1b6be',
          darkSubtle: '#858b94'
        },
        border: {
          DEFAULT: '#e3e5e8',
          strong: '#d0d4d9',
          dark: '#282c31',
          darkStrong: '#383d44'
        },
        helpdesk: {
          success: '#16803c',
          warning: '#a15c00',
          danger: '#c62828',
          info: '#1769aa'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace']
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
