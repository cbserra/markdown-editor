import { ReactComponent as Moon } from '../../../images/icon-dark-mode.svg'
import { ReactComponent as Sun } from '../../../images/icon-light-mode.svg'
import { useTheme } from '../../../hooks/useTheme'
import cx from 'classnames'

const ToggleMode = () => {
    const { darkMode, toggleDarkMode } = useTheme()

    return (
        <div className={'light-dark-toggle flex items-center justify-center m-3 mt-auto'}>
            <span
                className={cx('flex ', darkMode ? 'text-neutral-100' : 'text-neutral-600')}
                onClick={() => toggleDarkMode(true)}
            >
                <Moon className={'w-4 h-4'} />
            </span>
            <div
                className={
                    'relative buttons flex items-center justify-center bg-neutral-600 rounded-[14.5px] h-6 mx-2 w-12'
                }
            >
                <input
                    type="radio"
                    name="dark-mode"
                    id={'dark-mode-true'}
                    className={'radio-mode'}
                    value="true"
                    onChange={() => toggleDarkMode(true)}
                    checked={darkMode}
                />
                <input
                    type="radio"
                    name="dark-mode"
                    id={'dark-mode-false'}
                    className={'radio-mode'}
                    value="false"
                    onChange={() => toggleDarkMode(false)}
                    checked={!darkMode}
                />
                {/* transform: translate3d(0, 0, 0);
                        transition: transform 600ms cubic-bezier(0.02, 0.94, 0.09, 0.97),
                            background 300ms cubic-bezier(0.17, 0.67, 0.14, 1.03); */}
                <div
                    className={cx('switch-indicator', darkMode ? '-left-8' : '-left-2')}
                    onClick={() => toggleDarkMode((prevValue) => !prevValue)}
                ></div>
            </div>
            <span className={darkMode ? 'text-neutral-600' : 'text-neutral-100'} onClick={() => toggleDarkMode(false)}>
                <Sun className={'h-5 w-5'} />
            </span>
        </div>
    )
}

export default ToggleMode
