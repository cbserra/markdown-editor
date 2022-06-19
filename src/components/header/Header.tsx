import OpenCloseToggle from './open-close-toggle/OpenCloseToggle'
import { ReactComponent as Logo } from '../../images/logo.svg'
import Save from './save/Save'
import Document from './document/Document'
import Delete from './delete/Delete'
import { useMarkdownContext } from '../../contexts/MarkdownDocumentContext'
import { useEffect, useState } from 'react'

const Header = (props: {
    openNav: boolean
    toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>>
    openDeleteModal: boolean
    toggleOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { loadedDoc, setLoadedDoc } = useMarkdownContext()
    const [localDocumentName, setLocalDocumentName] = useState<string>(loadedDoc.name)

    useEffect(() => {
        const localLoadedDoc = Object.assign({}, loadedDoc)
        localLoadedDoc.name = localDocumentName
        console.log('🚀 ~ file: Header.tsx ~ line 15 ~ useEffect ~ localLoadedDoc', localLoadedDoc)

        setLoadedDoc(localLoadedDoc)
    }, [localDocumentName])

    useEffect(() => {
        setLocalDocumentName(loadedDoc.name)
        console.log('🚀 ~ file: Header.tsx ~ line 22 ~ useEfsm:h-14 sm:w-14 fe:ct ~ loadedDoc', loadedDoc)
    }, [loadedDoc])

    return (
        <header className="items-center bg-neutral-800 text-neutral-100 flex sm:h-14 md:h-[4.5rem] justify-between w-full">
            <OpenCloseToggle openNav={props.openNav} toggleOpenNav={props.toggleOpenNav} />
            <div className="logo-wrapper sm:hidden lg:block px-6 py-4 lg:border-r-neutral-600 lg:border-r-[1px]">
                <Logo title="logo" />
            </div>

            <Document documentName={localDocumentName} setDocumentName={setLocalDocumentName} />
            <Delete openDeleteModal={props.openDeleteModal} toggleOpenDeleteModal={props.toggleOpenDeleteModal} />
            <Save />
        </header>
    )
}

export default Header
