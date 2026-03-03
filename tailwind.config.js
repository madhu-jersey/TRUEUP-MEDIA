/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        charcoal: '#0D0D0D',
        surface: '#141414',
        surface2: '#1A1A1A',
        lime: '#A5CE40',
        muted: '#888888',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 20s linear infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}
