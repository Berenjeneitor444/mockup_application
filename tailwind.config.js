// tailwind.config.js
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [forms],
};
