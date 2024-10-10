/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'morand-bg': 'var(--morand-bg)',
        'morand-text': 'var(--morand-text)',
        'morand-accent': 'var(--morand-accent)',
        'morand-highlight': 'var(--morand-highlight)',
      },
    },
  },
  plugins: [],
};