/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        france: {
          blue: {
            DEFAULT: '#002395',
            50: '#EBF0FF',
            100: '#D6E0FF',
            200: '#ADC1FF',
            300: '#85A2FF',
            400: '#3D6BDB',
            500: '#002395',
            600: '#001C7A',
            700: '#001560',
            800: '#000F45',
            900: '#00082B',
          },
          red: {
            DEFAULT: '#ED2939',
            50: '#FEF2F3',
            100: '#FDE3E5',
            200: '#FCCCD0',
            300: '#F9A3AA',
            400: '#F47680',
            500: '#ED2939',
            600: '#D41E2E',
            700: '#B11724',
            800: '#8E1320',
            900: '#6B0F18',
          },
          white: '#FFFFFF',
          gold: {
            DEFAULT: '#D4AF37',
            50: '#FBF6E6',
            100: '#F6ECCC',
            200: '#EDD999',
            300: '#E4C766',
            400: '#DBB44E',
            500: '#D4AF37',
            600: '#B8962C',
            700: '#997D24',
            800: '#7A641D',
            900: '#5C4B16',
          },
        },
        surface: {
          cream: '#FDF8F3',
          dark: '#1E1E2E',
        },
        primary: {
          50: '#EBF0FF',
          100: '#D6E0FF',
          500: '#002395',
          600: '#001C7A',
          700: '#001560',
          900: '#00082B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Kalam', 'cursive'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'toast-exit': 'toastExit 0.2s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        toastExit: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
