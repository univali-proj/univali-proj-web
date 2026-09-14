/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '',
          100: '',
          200: '',
          300: '',
          400: '',
          500: '', 
          600: '', // Cor primária
          700: '',
          800: '',
          900: '',
        },
        ink: {
          DEFAULT: '#111827',
          primary: '#111827',
          body: '#374151',
          tertiary: '#6B7280',
          muted: '#9CA3AF',
        },
        line: {
          DEFAULT: '#D1D5DB',
          subtle: '#E5E7EB',
          strong: '#9CA3AF',
        },
        canvas: '#F9FAFB',
        hover: '#F3F4F6',
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

/* Todo: Conferir se essas configs estão sendo implementadas na versão 4 do Tailwind */