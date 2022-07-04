import OpenCloseToggle from './open-close-toggle/OpenCloseToggle'
import { ReactComponent as Logo } from '../../images/logo.svg'
import Save from './save/Save'
import Document from './document/Document'
import Delete from './delete/Delete'

const Header = (props: {
    openNav: boolean
    toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>>
    openDeleteModal: boolean
    toggleOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <header className="items-center bg-neutral-800 text-neutral-100 flex h-14 md:h-[4.5rem] justify-between w-full">
            <OpenCloseToggle openNav={props.openNav} toggleOpenNav={props.toggleOpenNav} />
            <div className="logo-wrapper hidden lg:block px-6 py-4 lg:border-r-neutral-600 lg:border-r-[1px]">
                <Logo title="logo" />
            </div>

            <Document />
            <Delete openDeleteModal={props.openDeleteModal} toggleOpenDeleteModal={props.toggleOpenDeleteModal} />
            <Save />
        </header>
    )
}

export default Header
