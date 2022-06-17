import { useState, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'

export const useTheme = () => {
    const isSystemInDarkMode = matchMedia('(prefers-color-scheme: dark)')
    const prefersDarkMode = () => isSystemInDarkMode.matches

    const [lsDarkModeEnabled, setLsDarkModeEnabled] = useLocalStorage<boolean>('dark-mode', prefersDarkMode())
    const [darkMode, toggleDarkMode] = useState<boolean>(lsDarkModeEnabled)

    useEffect(() => {
        setLsDarkModeEnabled(darkMode)

        if (window === undefined) return
        const root = window.document.documentElement

        if (darkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [darkMode])

    return { darkMode: darkMode, toggleDarkMode: toggleDarkMode }
}
