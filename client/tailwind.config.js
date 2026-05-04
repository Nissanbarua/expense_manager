/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4F72',
          dark: '#0D1B2A',
        },
        success: '#27AE60',
        warning: '#F39C12',
        danger: '#E74C3C',
        background: '#F8FAFC',
        jars: {
          necessities: '#3498DB',
          education: '#9B59B6',
          longTermSaving: '#27AE60',
          play: '#E67E22',
          financialFreedom: '#F1C40F',
          give: '#E74C3C',
        }
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
