/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  // content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        'black':{
          'light': '#e2e8f0',//slate-200
          'medium': '#94a3b8', //slate-400
          'dark': '#475569', //slate-600
          'darker': '#1e293b', //slate-800
        }
      },
    },
  },
  plugins: [nextui()],
};