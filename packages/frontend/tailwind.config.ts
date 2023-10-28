import { Config } from 'tailwindcss'

const animate = require('tailwindcss-animate')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
  ],
  theme: {
    colors: {
      black: '#111111',
      white: '#FFFFFF',
      'primary-community': '#5FDDBF',
      'primary-community-light': '#A1EEDB',
      'primary-circles': '#DF7FEF',
      'primary-circles-light': '#EDB8F5',
      surprised: '#FCD529',
      'surprised-light': '#FFEDBD',
      happy: '#8ADE63',
      'happy-light': '#B7EEB5',
      scared: '#70C4E8',
      'scared-light': '#BEE1F4',
      sad: '#BF8DDE',
      'sad-light': '#E1CDF0',
      angry: '#FA97AF',
      'angry-light': '#F2C6D8',
      rejecting: '#FDBE5B',
      'rejecting-light': '#F9D2B6'
    },
    fontSize: {
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem'
    },
    extend: {
      fontFamily: {
        yeseva: ['Yeseva One', 'serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        top: '0px 0px 15px 5px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: [animate]
} as Config
