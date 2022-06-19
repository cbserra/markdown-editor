import cx from 'classnames'
import { ReactComponent as OpenMenu } from '../../../images/icon-menu.svg'
// import iconClose from '../../../images/icon-close.svg'
import { ReactComponent as CloseMenu } from '../../../images/icon-close.svg'
import styled from 'styled-components'

const OpenCloseMenuBtn = styled.button`
    // align-items: center;
    // background-color: hsl(216deg 9% 23% / 100%);
    // color: #fff;
    // display: flex;
    // height: 3.5rem;
    // justify-content: center;
    // width: 3.5rem;

    // /* padding: 1rem; */

    // &:hover {
    //     background-color: hsl(13deg 75% 58% / 100%);
    //     cursor: pointer;
    // }

    // & .icon-open {
    //     display: block;
    //     // height: 14px;
    //     // width: 23px;
    // }

    // & .icon-close {
    //     display: none;
    // }

    // &.open .icon-open {
    //     display: none;
    // }

    // &.open .icon-close {
    //     display: block;
    //     // height: 18px;
    //     // width: 18px;
    // }
`

const OpenCloseToggle = (props: { openNav: boolean; toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const toggleSidebar = () => {
        console.log('props.openNav=' + JSON.stringify(props.openNav))
        props.toggleOpenNav((prevValue) => !prevValue)
    }

    // useEffect(() => {
    //     console.log((`inside OpenCloseToggle, useEffect`))

    //     const btn = document.getElementById('open-close-menu')
    //     btn?.addEventListener('click', toggleSidebar)

    //     return (
    //         btn?.removeEventListener('click', toggleSidebar)
    //     )
    // }, [])

    return (
        <OpenCloseMenuBtn
            id="open-close-menu"
            className={cx(
                'open-menu sm:h-14 sm:w-14 md:h-[4.5rem] md:w-[4.5rem] bg-neutral-700 text-neutral-100 flex items-center justify-center',
                'hover:bg-orange-idle',
                { open: props.openNav },
            )}
            onClick={toggleSidebar}
        >
            {/* <MdMenu className={styles['icon-open']} />
            <MdMenuOpen className={styles['icon-close']} /> */}
            <OpenMenu className={cx('icon-open', { inline: !props.openNav }, { hidden: props.openNav })} />
            <CloseMenu className={cx('icon-close', { hidden: !props.openNav }, { inline: props.openNav })} />
            {/* <i className={cx(styles['icon-open'], 'fa-solid fa-bars fa-2x')}></i>
            <i className={cx(styles['icon-close'], 'fa-solid fa-bars-staggered fa-2x')}></i> */}
            {/* <span className="material-icons md-dark">menu_open</span>
            <MenuIcon />
            <XIcon />
            <img src={iconMenu} alt="open menu" className={styles['icon-open']} />
            <img src={iconClose} alt="close menu" className={styles['icon-close']} /> */}
        </OpenCloseMenuBtn>
    )
}

export default OpenCloseToggle
