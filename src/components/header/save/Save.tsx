import { RefObject, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'

const SaveButton = styled.button``
const Save = () => {
    const { saveDocument, loadedDoc } = useContext(MarkdownContext)

    const saveDocRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        console.log('🚀 ~ file: Save.tsx ~ line 39 ~ useEffect ~ loadedDoc', loadedDoc)

        const element: HTMLButtonElement | null = saveDocRef.current
        element?.addEventListener('click', () => saveDocument(loadedDoc))

        return () => {
            element?.removeEventListener('click', () => saveDocument(loadedDoc))
        }
    }, [])

    return (
        <SaveButton
            className={cx(
                'flex items-center bg-orange-idle rounded sm:w-10 md:w-[9.5rem] h-10 m-1 justify-center text-neutral-100 hover:bg-orange-hover',
                'md:px-4 md:mx-2',
            )}
            ref={saveDocRef}
        >
            <SaveIcon />
            <span className="sm:hidden md:inline pl-2 text-md">Save Changes</span>
        </SaveButton>
    )
}

export default Save
