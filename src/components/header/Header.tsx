import OpenCloseToggle from './open-close-toggle/OpenCloseToggle'
import Save from './save/Save'
import Document from './document/Document'
import Delete from './delete/Delete'

const Header = (props: { openNav: boolean; toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <header className="items-center bg-neutral-800 flex h-14 justify-between w-full">
            <OpenCloseToggle openNav={props.openNav} toggleOpenNav={props.toggleOpenNav} />
            <Document />
            <Delete />
            <Save />
        </header>
    )
}

export default Header
