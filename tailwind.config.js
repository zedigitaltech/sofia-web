/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './main.js',
  ],
  theme: {
    extend: {
      colors: {
        violet: '#8B5CF6',
        'violet-light': '#A78BFA',
        'violet-dark': '#7C3AED',
        'violet-bg': '#F5F3FF',
        dark: '#0F0D1A',
        'dark-subtle': '#1A1726',
        success: '#10B981',
        navy: '#1B2A4A',
        gold: '#C9A84C',
      },
    },
  },
  plugins: [],
}
