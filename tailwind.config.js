module.exports = {
    content: ['./public/index.html', './src/**/*.{html,js,ts,tsx}'],
    darkMode: 'class',
    theme: {
        screens: {
            // 'sm': '375px',
            md: '768px',
            lg: '1440px',
        },
        colors: {
            neutral: {
                1000: 'hsl(225, 9%, 9%)',
                900: 'hsl(216, 8%, 12%)',
                800: 'hsl(220, 7%, 18%)',
                700: 'hsl(216, 9%, 23%)',
                600: 'hsl(216, 8%, 38%)',
                500: 'hsl(213, 4%, 51%)',
                400: 'hsl(222, 9%, 78%)',
                300: 'hsl(0, 0%, 89%)',
                200: 'hsl(0, 0%, 96%)',
                100: 'hsl(0, 0%, 100%)',
            },
            button: {
                idle: 'hsl(13, 75%, 58%)',
                hover: 'hsl(21, 86%, 67%)',
            },
        },
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['Roboto Slab', 'serif'],
            mono: ['Roboto Mono', 'monospace'],
        },
        fontSize: {
            base: '62.5%',
        },
        extend: {
            preview: ({ theme }) => ({
                h1: {
                    fontFamily: theme('fontFamily.serif'),
                    fontSize: '2rem',
                    fontWeight: '700',
                },
                h2: {
                    fontFamily: theme('fontFamily.serifLight'),
                    fontSize: '1.75rem',
                    fontWeight: '300',
                },
                h3: {
                    fontFamily: theme('fontFamily.serif'),
                    fontSize: '1.5rem',
                    fontWeight: '700',
                },
                h4: {
                    fontFamily: theme('fontFamily.serif'),
                    fontSize: '1.25rem',
                    fontWeight: '700',
                },
                h5: {
                    fontFamily: theme('fontFamily.serif'),
                    fontSize: '1rem',
                    fontWeight: '700',
                },
                h6: {
                    fontFamily: theme('fontFamily.serif'),
                    fontSize: '.875rem',
                    fontWeight: '700',
                },
                p: {
                    fontFamily: theme('fontFamily.serif'),
                    fontSize: '.875rem',
                    fontWeight: '400',
                    lineHeight: '1.5rem',
                },
            }),
            fontFamily: {
                serifLight: ['Roboto Slab Light', 'serif'],
            },
            spacing: {
                250: '250px',
            },
        },
    },
    plugins: [],
}
