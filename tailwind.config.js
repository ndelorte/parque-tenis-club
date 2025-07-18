/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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