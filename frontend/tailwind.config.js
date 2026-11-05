/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      colors: {
        costa: {
          blue: '#297392',      // Color principal "COSTA" del logotipo
          blueLight: '#3485A7', // Tono secundario celeste petróleo
          blueDark: '#1A4E66',  // Tono oscuro corporativo
          navy: '#0B2230',      // Azul marino profundo para fondos modernos
          red: '#8D1824',       // Rojo carmesí/granate del isotipo (flecha)
          redLight: '#B01E2D',  // Rojo vivo para estados hover
          redDark: '#681019',   // Rojo profundo
          charcoal: '#26292E',  // Gris carbón de "TRANSPORT"
        }
      },
      boxShadow: {
        'glow-blue': '0 10px 35px -5px rgba(41, 115, 146, 0.4)',
        'glow-red': '0 10px 35px -5px rgba(141, 24, 36, 0.4)',
        'card': '0 10px 30px -5px rgba(11, 34, 48, 0.07)',
        'card-hover': '0 20px 40px -10px rgba(41, 115, 146, 0.18)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
