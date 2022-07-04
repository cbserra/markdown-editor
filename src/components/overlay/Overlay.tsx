import React from 'react'
import cx from 'classnames'

interface Props {
    showOrHide?: boolean
    children: React.ReactNode
}

const Overlay: React.FunctionComponent<Props> = ({ showOrHide, children }) => {
    return (
        <div
            className={cx(
                `${showOrHide ? 'flex' : 'hidden'}`,
                'fixed z-50 flex items-center justify-center h-full w-full bg-opacity-50 bg-neutral-1000 dark:bg-opacity-50 dark:bg-neutral-500',
            )}
        >
            {children}
        </div>
    )
}

export default Overlay
