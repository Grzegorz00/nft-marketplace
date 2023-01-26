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
        '728' : '43rem'
      },
      fontFamily: {
        custom: "'Audiowide', cursive"
      },
      screens: {
        "1900" : "1800px",
        "2200" : "2200px",
        "2400" : "2400px"
      }
    }
  },
  plugins: [],
}