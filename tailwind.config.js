/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx,}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        "purple-1": '#611F69',
        'lightgrey-1': '#8C8C8C',
        'green-1': '#6B9F36',
        'lightpink-1': '#FCF6EF',
        'orange-1': '#F9CD92',
        'grey500-1': '#ECECEC',
        'pink-1': "#FCF5EF",
        'purple-2': '#451F49',
        'emailbg-1': '#6a4c6d',
        'offwhite': ' #FDFDFD',
        'offblack' :'#333333',
        'red-1' : '#FF605C'
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],

      },
    },
  },
  plugins: [],
};