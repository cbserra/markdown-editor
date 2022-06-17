import { RefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMarkdownContext } from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'

const SaveDiv = styled.button`
    border-radius: 0.25rem;
    display: flex;
    height: 2.5rem;
    justify-content: center;
    margin: 0.25rem;
    width: 2.5rem;
    color: #fff;

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
    const markdownContentEditorData = useMarkdownContext()
    const saveDocument = markdownContentEditorData.saveDocument
    // const loadedDoc = markdownContentEditorData.loadedDoc

    const saveDocRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        const element: HTMLButtonElement | null = saveDocRef.current

        element?.addEventListener('click', () => saveDocument(markdownContentEditorData))

        return () => {
            element?.removeEventListener('click', () => saveDocument(markdownContentEditorData))
        }
    }, [])

    return (
        <SaveDiv
            className="flex items-center bg-button-idle rounded h-10 w-10 m-1 justify-center text-neutral-100"
            ref={saveDocRef}
        >
            <SaveIcon />
        </SaveDiv>
    )
}

export default Save
