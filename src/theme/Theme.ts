import { DefaultTheme } from 'styled-components'
import { serialize } from 'v8'

interface FontProps {
    fontFamily: string
    fontSize: string
    fontWeight: string
}

interface ColorProps {
    backgroundColor: string
    color: string
}

interface MarkdownEditorTheme extends DefaultTheme {
    // colors: {
    //     [index: string]: string,
    // },
    togglePreview: ColorProps
    markdown: ColorProps
    preview: ColorProps & {
        h1: FontProps
        h2: FontProps
        h3: FontProps
        h4: FontProps
        h5: FontProps
        h6: FontProps
    }
    header: ColorProps
    sidebar: ColorProps
    inApp: {
        smallHeading: FontProps
        mediumHeading: FontProps
        body: FontProps
    }
}

export const colors = {
    '1000': 'hsl(225, 9%, 9%)',
    '900': 'hsl(216, 8%, 12%)',
    '800': 'hsl(220, 7%, 18%)',
    '700': 'hsl(216, 9%, 23%)',
    '600': 'hsl(216, 8%, 38%)',
    '500': 'hsl(213, 4%, 51%)',
    '400': 'hsl(222, 9%, 78%)',
    '300': 'hsl(0, 0%, 89%)',
    '200': 'hsl(0, 0%, 96%)',
    '100': 'hsl(0, 0%, 100%)',
    orange: 'hsl(13, 75%, 58%)',
    orangeHover: 'hsl(21, 86%, 67%)',
}

// export const globals: MarkdownEditorTheme = {
// togglePreview: {

// },
// markdown: {
// backgroundColor: colors['1000'],
// color: colors['400']
// },
// preview: {
//     h1: {
//         fontFamily: "'Roboto Slab', serif",
//         fontSize: '32px',
//         fontWeight: '700'
//     },
//     h2: {
//         fontFamily: "'Roboto Slab Light', serif",
//         fontSize: '28px',
//         fontWeight: '300'
//     },
//     h3: {
//         fontFamily: "'Roboto Slab', serif",
//         fontSize: '24px',
//         fontWeight: '700'
//     },
//     h4: {
//         fontFamily: "'Roboto Slab', serif",
//         fontSize: '20px',
//         fontWeight: '700'
//     },
//     h5: {
//         fontFamily: "'Roboto Slab', serif",
//         fontSize: '16px',
//         fontWeight: '700'
//     },
//     h6: {
//         fontFamily: "'Roboto Slab', serif",
//         fontSize: '14px',
//         fontWeight: '700'
//     },
// },
// header: {

// },
// sidebar: {

// }
//     IN APP:
// Roboto Regular - 15px, Wt 400 : In App Heading (M) (500)
// Roboto Regular - 14px Wt 500 - 2px Char Spacing : In App Heading (S) (700)
// Roboto Light - 13px Wt 300 : In App Body (S) (500)

// PREVIEW:
// Roboto Slab Bold - 32px Wt 700 : Preview H1 (700)
// Roboto Slab Light - 28px Wt 300 : Preview H2 (700)
// Roboto Slab Bold - 24px Wt 700 : Preview H3 (700)
// Roboto Slab Bold - 20px Wt 700 : Preview H4 (700)
// Roboto Slab Bold - 16px Wt 700 : Preview H5 (700)
// Roboto Slab Bold - 14px Wt 700 : Preview H6 (Orange)

// Roboto Slab Regular - 14px Wt 400 - 24px Line Spacing : Preview Paragraph (700)
// Roboto Slab Bold - 14px Wt 700 - 24px Line Spacing : Preview Paragraph Bold (700)

// MARKDOWN
// Roboto Mono Regular - 14px Wt 400 - 24px Line Spacing : Markdown - Preview Paragraph Bold (700)
// }

export const dark: DefaultTheme = {
    ...colors,

    togglePreview: {
        backgroundColor: colors['900'],
        color: colors['400'],
    },
    markdown: {
        backgroundColor: colors['1000'],
        color: colors['400'],
    },
    preview: {},
    header: {},
    sidebar: {},
}
