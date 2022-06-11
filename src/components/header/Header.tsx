import styles from './Header.module.scss'
import iconMenu from '../../images/icon-menu.svg'
import iconClose from '../../images/icon-close.svg'
import iconDocument from '../../images/icon-document.svg'
import iconSave from '../../images/icon-save.svg'
import iconDelete from '../../images/icon-delete.svg'
import { MarkdownDocument } from '../../data/DataTypes'
import { useEffect, useRef } from 'react'

const Header = (props: {
    slideClassname: string
    openClassname: string
    loadedFile: MarkdownDocument
    saveDocument: () => void
}) => {
    const loadedFile = props.loadedFile

    const openNav = () => {
        const sidenav = document.getElementById('sidenav')
        const mainContainer = document.getElementById('main-container')
        const openCloseMenu = document.getElementById('open-close-menu')

        if (sidenav) {
            sidenav.classList.toggle(props.openClassname)
        }

        if (mainContainer) {
            mainContainer.classList.toggle(props.slideClassname)
        }

        if (openCloseMenu) {
            openCloseMenu.classList.toggle(styles.open)
        }
    }

    const saveDocRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const element = saveDocRef.current

        element?.addEventListener('click', props.saveDocument)

        return () => {
            element?.removeEventListener('click', props.saveDocument)
        }
    }, [props.saveDocument])

    return (
        <header>
            <div id="open-close-menu" className={styles['open-menu']} onClick={openNav}>
                <img src={iconMenu} alt="open menu" className={styles['icon-open']} />
                <img src={iconClose} alt="close menu" className={styles['icon-close']} />
            </div>
            <div className={styles.document}>
                <img src={iconDocument} alt="document" />
                <span className={styles.filename}>{loadedFile.name}</span>
            </div>
            <div className={styles.delete}>
                <img src={iconDelete} alt="delete" />
            </div>
            <div className={styles.save} ref={saveDocRef}>
                <img src={iconSave} alt="save" />
            </div>
        </header>
    )
}

export default Header
