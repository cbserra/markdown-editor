import { RefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMarkdownContext } from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'

const SaveButton = styled.button`
    // border-radius: 0.25rem;
    // display: flex;
    // height: 2.5rem;
    // justify-content: center;
    // margin: 0.25rem;
    // width: 2.5rem;
    // color: #fff;

    &:hover {
        background-color: hsl(21deg 86% 68% / 100%);
        cursor: pointer;
    }

    // & img {
    //     height: 1rem;
    //     width: 1rem;
    // }

    // & i {
    //     height: 1rem;
    //     width: 1rem;
    // }
`
const Save = () => {
    const { saveDocument, loadedDoc } = useMarkdownContext()
    // const saveDocument = markdownContentEditorData.saveDocument

    // const loadedDoc = markdownContentEditorData.loadedDoc

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
