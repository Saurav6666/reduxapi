/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'Neutral':'#737373',
        'alert':'red',
        'cyan':'rgb(103 232 249);',
        'gray':'#9ca3af',
        'black':'#0a0a0a',
        'eye':'rgb(51, 188, 223);',
        'chart':'rgb(126, 236, 176);',
        'trash':'red'
      }
    },
    
  },
  plugins: [],
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
 
};
