/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // keyframes: {
      //   "accordion-down": {
      //     from: { height: "0" },
      //     to: { height: "var(--radix-accordion-content-height)" },
      //   },
      //   "accordion-up": {
      //     from: { height: "var(--radix-accordion-content-height)" },
      //     to: { height: "0" },
      //   },
      // },
      // animation: {
      //   "accordion-down": "accordion-down 0.2s ease-out",
      //   "accordion-up": "accordion-up 0.2s ease-out",
      // },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7cc5ff',
          400: '#36a6ff',
          500: '#0080ff',
          600: '#0066ff',
          700: '#0052cc',
          800: '#004299',
          900: '#002e66',
        },
        secondary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b3c5ff',
          400: '#809fff',
          500: '#4d7aff',
          600: '#1a55ff',
          700: '#0033cc',
          800: '#002699',
          900: '#001a66',
        },
        gold: {
          50: '#fdfbed',
          100: '#fbf6d1',
          200: '#f7eba3',
          300: '#f3db6c',
          400: '#f0cb45',
          500: '#ecb71e',
          600: '#d49912',
          700: '#b07610',
          800: '#8d5a14',
          900: '#744a15',
        }
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(0, 0, 0, 0.15)',
        'glow-lg': '0 0 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};