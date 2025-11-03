/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-charcoal': { DEFAULT: '#1B1B1B', dark: '#1B1B1B', light: '#F9FAFB' },
        'card-dark': { DEFAULT: '#2D3748', dark: '#2D3748', light: '#FFFFFF' },
        'near-black': { DEFAULT: '#1A202C', dark: '#1A202C', light: '#E5E7EB' },
        'cool-white': { DEFAULT: '#FFFFFF', dark: '#FFFFFF', light: '#FFFFFF' },
        'teal-green': { DEFAULT: '#22C55E', dark: '#22C55E', light: '#22C55E' },
        'electric-orange': { DEFAULT: '#FF9800', dark: '#FF9800', light: '#F97316' },
        'text-primary': { DEFAULT: '#E2E8F0', dark: '#E2E8F0', light: '#111827' },
        'text-secondary': { DEFAULT: '#A0AEC0', dark: '#A0AEC0', light: '#6B7280' },
        'border-gray-dark': '#393939', // 👈 Added global border color
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
