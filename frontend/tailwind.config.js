module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          100: '#ffe5d4',
          200: '#fdbba1',
          300: '#fb8c5d',
          400: '#f76a3c',
          500: '#f45a2b',
          600: '#d94a24',
          700: '#b63c1d',
          800: '#8f2f17',
          900: '#6b2412',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
