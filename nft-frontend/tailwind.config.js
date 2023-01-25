/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '01' : '0.02rem',
        '115': '30rem',
        '120': '32.25rem',
        '128': '32rem',
        '144': '36rem',
        '160' : '42rem',
        '185' : '11.563rem',
        '500' : '28.125rem',
        '600' : '44.125rem',
        '728' : '43rem',
        '650' : '38rem',
        '320' : '20rem',
        '472' : '29.5rem'
      },
      fontFamily: {
        custom: "'Audiowide', cursive"
      },
      maxWidth: {
        'm': '16rem'
      }
    }
  },
  plugins: [],
}