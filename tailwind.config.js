/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF5F8',
          100: '#FFEAF1',
          200: '#FFD4E3',
          300: '#FFB8D0',
          400: '#FF9ABC',
          500: '#FF80AB',
          600: '#FF669A', // Cor primária
          700: '#D64176',
          800: '#A92D59',
          900: '#7D203F',
        },
        secondary: {
          50: '#FAF9F2',
          100: '#F4F1E4',
          200: '#ECE7D2',
          300: '#E6DFC2',
          400: '#E1D8B6',
          500: '#DCD2AC',
          600: '#D6CCA2',
          700: '#A89A64',
          800: '#796D42',
          900: '#51482D',
        },
        ink: {
          DEFAULT: '#36090b',
          primary: '#36090b',
          body: '#36090b',
          tertiary: '#765457',
          muted: '#84696B',
        },
        line: {
          DEFAULT: '#DED5CD',
          subtle: '#EDE7E0',
          strong: '#A69087',
        },
        canvas: '#FFFDFA',
        hover: '#F4F1E4',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
