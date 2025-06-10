/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                termina: ['Termina', 'sans-serif'],
            },
            colors: {
                // Color de prueba
                testcolor: '#ff0000',
            },
        },
    },
    plugins: [],
};
