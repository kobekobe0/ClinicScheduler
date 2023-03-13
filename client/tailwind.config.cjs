/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            dominant: '#090e34', //page bg main
            lighterDominant: '#0c113b', //page bg2
            sub: '#4b6cf7', //btn light
            minor: '#222649', //btn dark
            white: '#d8d8df', //major texts
            lightGray: '#9197b9', //sub texts
        },
    },
    plugins: [],
}
