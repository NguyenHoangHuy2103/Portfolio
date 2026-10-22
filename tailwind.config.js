/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#042C53',
        navy2: '#0C447C',
        blue: {
          DEFAULT: '#378ADD',
          dark: '#2563EB',
          light: '#7DB4FF',
        },
        muted: {
          DEFAULT: '#5A6E85',
          dark: '#94A3B8',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#0A192D',
          darker: '#06101D',
        },
        line: {
          light: 'rgba(4, 44, 83, 0.12)',
          dark: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
