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
        // Your existing primary colors
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
        // Your existing secondary colors
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
        // Your existing cute colors
        cute: {
          pink: '#ff6b9d',
          peach: '#ffb347',
          mint: '#98fb98',
          lavender: '#dda0dd',
          sky: '#87ceeb',
        },
        // Additional cute colors for backward compatibility
        'cute-pink': '#ff6b9d',
        'cute-peach': '#ffb347',
        'cute-mint': '#98fb98',
        'cute-lavender': '#dda0dd',
        'cute-sky': '#87ceeb',
      },
      fontFamily: {
        // Your existing fonts
        sans: ['Inter', 'sans-serif'],
        cute: ['Comic Sans MS', 'cursive'],
        // Add Comic Neue as backup
        'cute-neue': ['Comic Neue', 'Comic Sans MS', 'cursive'],
      },
      animation: {
        // Your existing animations
        'bounce-soft': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        // Additional animations for enhanced effects
        'bounce-soft-custom': 'bounce-soft-custom 2s infinite',
        'pulse-slow-custom': 'pulse-slow-custom 3s infinite',
        'wiggle-enhanced': 'wiggle-enhanced 2s ease-in-out infinite',
      },
      keyframes: {
        // Your existing wiggle
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        // Additional keyframes for enhanced animations
        'bounce-soft-custom': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-slow-custom': {
          '0%, 100%': {
            opacity: '0.5',
          },
          '50%': {
            opacity: '1',
          },
        },
        'wiggle-enhanced': {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(-5deg)',
          },
          '75%': {
            transform: 'rotate(5deg)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config