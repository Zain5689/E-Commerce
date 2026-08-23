/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgb(var(--color-brand-50, 37 99 235) / <alpha-value>)',
          100: 'rgb(var(--color-brand-100, 219 234 254) / <alpha-value>)',
          200: 'rgb(var(--color-brand-200, 191 219 254) / <alpha-value>)',
          300: 'rgb(var(--color-brand-300, 147 197 253) / <alpha-value>)',
          400: 'rgb(var(--color-brand-400, 96 165 250) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500, 59 130 246) / <alpha-value>)',
          600: 'rgb(var(--color-brand-600, 37 99 235) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700, 29 78 216) / <alpha-value>)',
          800: 'rgb(var(--color-brand-800, 30 64 175) / <alpha-value>)',
          900: 'rgb(var(--color-brand-900, 30 58 138) / <alpha-value>)',
          950: 'rgb(var(--color-brand-950, 23 37 84) / <alpha-value>)',
        },
        cyber: {
          cyan: '#06b6d4',
          cyanGlow: 'rgba(6, 182, 212, 0.25)',
          purple: '#8b5cf6',
          purpleGlow: 'rgba(139, 92, 246, 0.25)',
          amber: '#f59e0b',
          emerald: '#10b981',
        },
        dark: {
          bg: '#080c14',
          card: '#0e1526',
          cardHover: '#131c33',
          surface: '#18223d',
          border: '#1e2d4d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
