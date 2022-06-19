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
            <div className={'relative inline-block buttons bg-neutral-600 rounded-[14.5px] h-6 mx-2 w-12'}>
                <input
                    type="checkbox"
                    name="dark-mode"
                    id={'dark-mode'}
                    className={'radio-mode peer'}
                    // value="true"
                    onChange={() => toggleDarkMode(!darkMode)}
                    checked={darkMode}
                />
                <span
                    className={cx(
                        'switch-indicator bg-neutral-100 h-[12px] w-[12px] rounded-[50%] absolute z-10 top-0 bottom-0 left-[30px] right-0 mt-auto mb-auto',
                        'peer-checked:left-[6px]',
                    )}
                    onClick={() => toggleDarkMode((prevValue) => !prevValue)}
                ></span>
            </div>
            <span className={darkMode ? 'text-neutral-600' : 'text-neutral-100'} onClick={() => toggleDarkMode(false)}>
                <Sun className={'h-5 w-5'} />
            </span>
        </div>
    )
}

export default ToggleMode
