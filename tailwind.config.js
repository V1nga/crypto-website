/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'w-full',
    {
      pattern: /(bg|text)-(\w)/
    },
    {
      pattern: /(bg|text)-(\w)-(\w)/
    },
    {
      pattern: /(bg|text)-(\w)-(\w)-(\n)/
    },
    {
      pattern: /place-content-(\w)/
    },
    {
      pattern: /rounded-(\w)/
    }
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      active: '#F3F5FD',
      primary: {
        light: '#E7EBFC',
        'light-2': '#DDE4FF',
        DEFAULT: '#425EFF',
        dark: '#2B48F0'
      },
      secondary: '#6A6E85',
      warning: {
        light: '#FDECD1',
        DEFAULT: '#F79E1B'
      },
      success: { 
        light: '#59B72A33',
        DEFAULT: '#59B72A'
      },
      danger: {
        light: '#FADFDC',
        DEFAULT: '#E54F3A',
        dark: '#C64433'
      },
      placeholder: '#9DA0AF',
      balck: '#000000',
      white: '#FFFFFF',
      dark: '#232323',
      blue: {
        light: '#FAFBFF',
        DEFAULT: '#1fb6ff',
        dark: '#009eeb',
      },
      gray: {
        light: '#E6E6E6',
        DEFAULT: '#E1E2E7'
      }
    }
  },
  plugins: [],
}