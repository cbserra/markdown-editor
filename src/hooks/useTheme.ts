import { useState, useEffect, useCallback } from 'react'
import useLocalStorage from 'use-local-storage'

export type Theme = 'dark' | 'light'

export const useTheme = () => {
    const isSystemInDarkMode = matchMedia('(prefers-color-scheme: dark)')
    const getPreferredColorScheme = () => (isSystemInDarkMode.matches ? 'dark' : 'light')

    const [currentTheme, setCurrentTheme] = useLocalStorage<Theme>('current-theme', getPreferredColorScheme())
    const [themeLoaded, setThemeLoaded] = useState(false)

    const setMode = useCallback(
        (mode: Theme) => {
            setCurrentTheme(mode)
        },
        [setCurrentTheme],
    )

    useEffect(() => {
        setMode(currentTheme)
        setThemeLoaded(true)
    }, [currentTheme, setMode])

    return { currentTheme, themeLoaded, setMode }
}
