/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    "w-full",
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
      transparent: "transparent",
      primary: {
        light: '#E7EBFC',
        'light-2': "#DDE4FF",
        DEFAULT: "#425EFF",
        dark: '#2B48F0'
      },
      secondary: "#6A6E85",
      warning: "#F79E1B",
      success: "#59B72A",
      danger: "#E54F3A",
      placeholder: "#9DA0AF",
      balck: "#000000",
      white: "#FFFFFF",
      dark: "#232323",
      blue: {
        light: '#FAFBFF',
        DEFAULT: '#1fb6ff',
        dark: '#009eeb',
      },
      gray: {
        light: "#E6E6E6"
      }
    }
  },
  plugins: [],
}

