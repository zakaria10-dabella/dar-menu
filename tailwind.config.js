/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FFFBF3', 100: '#FBF3E4', 200: '#F3E4C8' },
        emerald: { 700: '#145244', 800: '#0F3D33', 900: '#0A2A23' },
        saffron: { 400: '#F0B85A', 500: '#E8A33D' },
        terracotta: '#B5482D',
        teal: '#1F8A84',
        ink: '#1D1B16',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
