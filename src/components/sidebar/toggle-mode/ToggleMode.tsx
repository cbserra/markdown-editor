import { ReactComponent as Moon } from '../../../images/icon-dark-mode.svg'
import { ReactComponent as Sun } from '../../../images/icon-light-mode.svg'
import { useTheme } from '../../../hooks/useTheme'
import cx from 'classnames'

const ToggleMode = () => {
    const { darkMode, toggleDarkMode } = useTheme()

    return (
        <div className={'light-dark-toggle flex items-center justify-center m-3 mt-auto'}>
            <label className="light-dark-toggle-label flex items-center justify-center cursor-pointer">
                <span
                    className={cx(
                        'flex ',
                        darkMode ? 'text-neutral-100' : 'text-neutral-600',
                        'transition-colors duration-200 ease-in-out',
                    )}
                >
                    <Moon className={'w-4 h-4'} />
                </span>
                <div className={'relative inline-block buttons bg-neutral-600 rounded-[14.5px] h-6 mx-2 w-12'}>
                    <input
                        type="checkbox"
                        name="dark-mode"
                        id={'dark-mode'}
                        className={cx(
                            'peer appearance-none absolute h-full w-full cursor-pointer',
                            'before:absolute before:rounded-[50%] before:h-[70%] before:w-[85%] before:top-[50%] before:translate-x-[47px] before:-translate-y-1/2',
                            'after:absolute after:bg-neutral-100 after:rounded-[50%] after:h-[12px] after:w-[12px] after:top-[50%] after:translate-x-7 after:-translate-y-1/2',
                            'after:transition-transform after:duration-200 after:ease-in-out',
                            'checked:after:translate-x-2 checked:after:-translate-y-1/2',
                        )}
                        onChange={() => toggleDarkMode(!darkMode)}
                        checked={darkMode}
                    />
                </div>
                <span
                    className={cx(
                        darkMode ? 'text-neutral-600' : 'text-neutral-100',
                        'transition-colors duration-200 ease-in-out',
                    )}
                >
                    <Sun className={'h-5 w-5'} />
                </span>
            </label>
        </div>
    )
}

export default ToggleMode
