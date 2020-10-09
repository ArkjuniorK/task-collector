module.exports = {
  corePlugins: {},
  purge: {
    content: ['./src/**/*.vue', './public/**/*.html'],
    options: {
      whitelist: [
        'bg-red-theme',
        'bg-red-subtheme',
        'bg-red-task',
        'bg-blue-theme',
        'bg-blue-subtheme',
        'bg-blue-task',
        'bg-green-theme',
        'bg-green-subtheme',
        'bg-green-task',
        'bg-yellow-theme',
        'bg-yellow-subtheme',
        'bg-yellow-task',
        'bg-orange-theme',
        'bg-orange-subtheme',
        'bg-orange-task'
      ]
    }
  },
  theme: {
    extend: {
      height: {
        'screen-50': '50vh',
        'screen-80': '80vh'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      display: ['"Roboto Condensed"', 'sans-serif']
    },
    colors: {
      dark: {
        100: '#2c3d42',
        200: '#3f5359',
        300: '#8B9DA3',
        400: '#617B84'
      },
      light: {
        100: '#f7fafc',
        200: '#e8f1f4',
        300: '#d5dcde'
      },
      transparent: 'transparent',
      white: '#ffffff',
      // Task Color
      red: {
        task: '#FFB7B7',
        subtheme: '#FFB7D1',
        theme: '#FFC8B7'
      },
      green: {
        task: '#B7FFC7',
        subtheme: '#B7FFD4',
        theme: '#B7FFE5'
      },
      blue: {
        task: '#B7CFFF',
        subtheme: '#B7D4FF',
        theme: '#CAB7FF'
      },
      yellow: {
        task: '#FFF8B7',
        subtheme: '#E8FFB7',
        theme: '#DFFFB7'
      },
      orange: {
        task: '#FFD1B7',
        subtheme: '#FFB7B7',
        theme: '#FFEBB7'
      }
    },
    screens: {
      xs: '300px', // => @media (min-width: 320px) { ... }
      sm: '360px', // => @media (min-width: 640px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '1024px', // => @media (min-width: 1024px) { ... }
      xl: '1280px', // => @media (min-width: 1280px) { ... }
      xxl: '1440px', // => @media (min-width: 1400px) { ... }
      xxxl: '1600px' // => @media (min-width: 1600px) { ... }
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '10xl': '8rem'
    }
  }
}
