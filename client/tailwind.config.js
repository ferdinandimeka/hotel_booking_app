/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: {'min': '0px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: {'min': '767px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: {'min': '1023px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: {'min': '1279px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1535px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
