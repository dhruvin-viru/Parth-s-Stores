/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36a9f8',
          500: '#0c8ce9',
          600: '#026fc7',
          700: '#0358a1',
          800: '#074b84',
          900: '#0c3f6e',
          950: '#082849',
        },
        accent: {
          50: '#fff1f2',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        surface: {
          light: '#ffffff',
          card: '#f8fafc',
          border: '#e2e8f0',
          dark: '#0f172a',
          darkCard: '#1e293b',
          darkBorder: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(12, 140, 233, 0.35)',
      }
    },
  },
  plugins: [],
}
