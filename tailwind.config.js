const colors = require('tailwindcss/colors')
module.exports = {
    darkMode: 'class',
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                sm: {
                    css: {
                        '--tw-prose-pre-bg': colors.transparent,
                    }
                }
            }),
            width: {
                "350": "350px"
            },
            maxWidth: {
                "300": "75rem"
            }
        },
    },
    plugins: [require("@tailwindcss/typography")],
}