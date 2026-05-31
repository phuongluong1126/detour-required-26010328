/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fdfcff',
          100: '#f8f3ff',
          200: '#f0e8ff',
        },
        plum: {
          900: '#1a0d2e',
          800: '#2d1b4e',
          700: '#3d2563',
          600: '#553080',
        },
        lavender: {
          50:  '#f5f0ff',
          100: '#ede5ff',
          200: '#d8caff',
          300: '#bea8ff',
          400: '#a07ff5',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        blush: {
          50:  '#fff0f6',
          100: '#ffe0ef',
          200: '#ffc0dd',
          300: '#ff9fc9',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        rose: {
          25: '#fff8fb',
        },
        sage: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#a7f3d0',
          400: '#34d399',
          500: '#10b981',
        },
        amber: {
          25: '#fffbf0',
        },
        sky: {
          25: '#f0f9ff',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'float-slow':  'float 8s ease-in-out infinite',
        'float-mid':   'float 6s ease-in-out 1s infinite',
        'float-fast':  'float 5s ease-in-out 2s infinite',
        'spin-slow':   'spin 25s linear infinite',
        'spin-rev':    'spinRev 20s linear infinite',
        'pulse-soft':  'pulseSoft 4s ease-in-out infinite',
        'drift':       'drift 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        spinRev: {
          from: { transform: 'rotate(360deg)' },
          to:   { transform: 'rotate(0deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        drift: {
          '0%':   { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%':  { transform: 'translate(12px, -16px) rotate(120deg)' },
          '66%':  { transform: 'translate(-8px, 10px) rotate(240deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
