/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
    serif: ['"Libre Baskerville"', 'serif'],
  },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes:{
        fadeInUp: {
          '0%': {opacity: 0, transform: 'translateY(20px)'},
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
      },
      colors: {
        primary: "#A65218",     // Marrón rojizo del logo
        secondary: "#5B8548",   // Verde césped del logo
        accent: "#D9E4D1",      // Verde pastel claro (contraste suave)
        neutral: "#222222",     // Negro suave para textos
        beige: "#BBBDA0",       // Fondo cálido, tipo papel
      },
    },
  },
  plugins: [],
}