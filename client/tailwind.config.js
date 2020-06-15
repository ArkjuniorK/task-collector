module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    extend: {},
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
      display: ['"Roboto Condensed"', 'sans-serif']
    },
    colors: {
      dark: {
        100: '#2c3d42',
        200: '#3f5359',
        300: '#8B9DA3'
      },
      light: {
        100: '#f7fafc',
        200: '#e8f1f4',
        300: '#d5dcde'
      },
      transparent: 'transparent',
      white: '#ffffff',
      pink: '#ffb7eb',
      red: '#FFB7B7',
      green: '#B7FFC7',
      blue: '#B7CFFF',
      yellow: '#FFF8B7',
      orange: '#FFD1B7'
    },
    screens: {
      xs: '320px',
      // => @media (min-width: 320px) { ... }

      sm: '420px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1600px'
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {},
  plugins: []
}
