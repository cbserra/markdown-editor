import cx from 'classnames'
// import { ReactComponent as OpenMenu } from '../../../images/icon-menu.svg'
// import { ReactComponent as CloseMenu } from '../../../images/icon-close.svg'
import styled from 'styled-components'

const OpenCloseMenuBtn = styled.button``
const OpenCloseMenuDiv = styled.div``

const OpenCloseToggle = (props: { openNav: boolean; toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const toggleSidebar = () => {
        props.toggleOpenNav((prevValue) => !prevValue)
    }

    return (
        <OpenCloseMenuDiv
            id="open-close-menu"
            className={cx(
                'hamburger-x relative',
                'open-menu h-14 w-14 md:h-[4.5rem] md:w-[4.5rem] p-3 bg-neutral-700 text-neutral-100 flex items-center justify-center flex-col',
                'hover:bg-orange-idle',
                { open: props.openNav },
            )}
            // onClick={toggleSidebar}
        >
            <div className="hamburger-container flex flex-col relative items-center justify-center w-full h-full">
                <label className="h-full w-full absolute flex flex-col justify-center items-center">
                    <input
                        type="checkbox"
                        id="open-close-menu-checkbox"
                        className="w-0 h-0 opacity-0 hidden"
                        onChange={toggleSidebar}
                    />
                    <div className="hamburger"></div>
                </label>
                {/* <div className="bar top"></div>
                <div className="bar mid"></div>
                <div className="bar bot"> </div> */}
            </div>
        </OpenCloseMenuDiv>

        // <OpenCloseMenuBtn
        //     id="open-close-menu"
        //     className={cx(
        //     'open-menu h-14 w-14 md:h-[4.5rem] md:w-[4.5rem] bg-neutral-700 text-neutral-100 flex items-center justify-center',
        //     'hover:bg-orange-idle',
        //     { open: props.openNav },
        // )}
        //     onClick={toggleSidebar}
        // >
        //     <OpenMenu
        //         className={cx('icon-open active:rotate-45', { inline: !props.openNav }, { hidden: props.openNav })}
        //     />
        //     <CloseMenu
        //         className={cx('icon-close active:-rotate-45', { hidden: !props.openNav }, { inline: props.openNav })}
        //     />
        // </OpenCloseMenuBtn>
    )
}

export default OpenCloseToggle
