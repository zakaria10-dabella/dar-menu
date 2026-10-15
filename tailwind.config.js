/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep forest (zellige glaze), bone paper, one saffron accent.
        forest: { 950: '#0B1D19', 900: '#102A24', 800: '#163A31', 700: '#21503F' },
        paper: { 50: '#FBF7EF', 100: '#F4EDE1', 200: '#EAE0CD', 300: '#D8C9AC' },
        ink: { DEFAULT: '#1C1A16', soft: '#575045' },
        saffron: { 300: '#F0C978', 400: '#E6B04F', 500: '#D9962B' },
      },
      fontFamily: {
        display: ['"Playfair Display SC"', 'Georgia', 'serif'],
        sans: ['Karla', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
        arabicDisplay: ['Amiri', 'Georgia', 'serif'],
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
