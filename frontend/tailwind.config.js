/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FDFBF7',
          dark: '#F4EFE6',
          light: '#FFFDF9',
        },
        beige: {
          DEFAULT: '#EFE6D5',
          dark: '#DECDB5',
        },
        'soft-brown': {
          DEFAULT: '#8C7A6B',
          dark: '#6E5E50',
          light: '#A8998C',
        },
        charcoal: {
          DEFAULT: '#1A1918',
          light: '#2D2B29',
          lighter: '#423F3C',
        },
        gold: {
          DEFAULT: '#D4AF37',
          hover: '#C5A028',
          light: '#F4E8B8',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(26, 25, 24, 0.05)',
        'elevated': '0 12px 30px -4px rgba(26, 25, 24, 0.08)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
