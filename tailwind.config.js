/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'jakarata' : 'Plus Jakarta Sans'
    },
    colors: {
      'dark-main': '#000112',
      'dark-darkBG': '#20212C',
      'dark-grey': '#2B2C37',
      'dark-lines': '#3E3F4E',
      'light-grey': '#828FA3',
      'light-lines': '#E4EBFA',
      'light-darkBG': '#F4F7FD',
      'light-main': '#FFFFFF',
      'mainPurple': '#635FC7',
      'mainPurpleHover': '#A8A4FF',
      'red': '#EA5555',
      'redHover': '#FF9898'
    },
    fontSize: {
      'xl': '24px',
      'l': '18px',
      'm': '15px',
      's': '12px',
      'mb': '12px'
    },
    screens: {
      'vs':'0px',
      'sm': '375px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {},
  },
  plugins: [],
}