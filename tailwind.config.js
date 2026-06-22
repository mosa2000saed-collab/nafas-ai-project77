/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfbf7',
          100: '#f9f5ee',
          200: '#f0e8d8',
          300: '#e2d4b8',
          400: '#d1b88f',
          500: '#c4a46a',
          600: '#a88a52',
          700: '#8a6f43',
          800: '#6e5838',
          900: '#4a3a26',
        },
        palm: {
          50: '#f4f9f0',
          100: '#e3f0da',
          200: '#c5e2b3',
          300: '#9dce85',
          400: '#78b55c',
          500: '#5a9a3e',
          600: '#457c30',
          700: '#376228',
          800: '#2f4f24',
          900: '#26401f',
        },
        saudi: {
          green: '#165d31',
          dark: '#0f172a',
          gold: '#c9a84c',
          cream: '#f5efe0',
          earth: '#8b7355',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Tajawal"', '"Noto Sans Arabic"', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-dots': 'radial-gradient(circle, var(--pattern-color) 1px, transparent 1px)',
        'pattern-grid': 'linear-gradient(to right, var(--pattern-color) 1px, transparent 1px), linear-gradient(to bottom, var(--pattern-color) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
