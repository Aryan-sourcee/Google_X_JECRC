/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
          dark: '#0F172A',
          card: '#1E293B',
          cardHover: '#2A394E',
          border: 'rgba(255, 255, 255, 0.08)',
          textSec: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 25px -5px rgba(66, 133, 244, 0.5)',
        'glow-red': '0 0 25px -5px rgba(234, 67, 53, 0.5)',
        'glow-green': '0 0 25px -5px rgba(52, 168, 83, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'radar-sweep': 'radar 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(66, 133, 244, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(66, 133, 244, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
