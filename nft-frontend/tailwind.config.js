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
        '128': '32rem',
        '144': '36rem',
        '160' : '42rem',
        '500' : '500px',
        '600' : '600px'
      },
      fontFamily: {
        nftName: "'Audiowide', cursive"
      }
    }
  },
  plugins: [],
}