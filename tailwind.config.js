module.exports = {
    content: ['./public/index.html', './src/**/*.{html,js,ts,tsx}'],
    darkMode: 'class',
    theme: {
        screens: {
            sm: '375px',
            md: '768px',
            lg: '1440px',
        },
        colors: {
            inherit: ['inherit'],
            current: ['currentColor'],
            transparent: ['transparent'],
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
            orange: {
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
            xs: ['13px', '15px'],
            sm: [
                '14px',
                {
                    lineHeight: '16px',
                    letterSpacing: '2px',
                },
            ],
            md: ['15px', '18px'],
            base: '62.5%',
        },
        extend: {
            backgroundImage: {
                'moon-icon': "url('/src/images/icon-dark-mode.svg')",
            },
            spacing: {
                250: '250px',
            },
        },
    },
    plugins: [],
}
