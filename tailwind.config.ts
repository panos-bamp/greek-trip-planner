import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1F6B', // Deep blue from your reference
          50: '#E6EAF7',
          100: '#CCD5EF',
          200: '#99ABE0',
          300: '#6681D0',
          400: '#3357C1',
          500: '#0B1F6B',
          600: '#091956',
          700: '#071341',
          800: '#050D2B',
          900: '#020616',
        },
        accent: {
          pink: '#E94B8B',
          cyan: '#4ECDC4',
          yellow: '#FFD93D',
        },
        greek: {
          blue: '#0D47A1',
          white: '#FFFFFF',
          aegean: '#1E88E5',
          santorini: '#FF6B9D',
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
