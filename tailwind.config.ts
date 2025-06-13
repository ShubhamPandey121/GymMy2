import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fcd4ff',
          300: '#fab1ff',
          400: '#f67eff',
          500: '#ed4bff',
          600: '#d929e8',
          700: '#b61bc4',
          800: '#9618a0',
          900: '#7a1a83',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        cute: {
          pink: '#ff6b9d',
          peach: '#ffb347',
          mint: '#98fb98',
          lavender: '#dda0dd',
          sky: '#87ceeb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cute: ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'bounce-soft': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
