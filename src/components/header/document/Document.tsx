import { ChangeEvent, createRef, RefObject, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMarkdownContext } from '../../../contexts/MarkdownDocumentContext'
import { ReactComponent as DocIcon } from '../../../images/icon-document.svg'
import { MarkdownEditorData } from '../../../types/MarkdownTypes'

const DocumentDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    color: #fff;

    & i {
        height: 16px;
        margin: 1rem 1.5rem;
        width: 14px;
    }

    & .filename {
        background-color: transparent;
        border: 0;

        /* 100 */
        color: #fff;
        font-family: Roboto, sans-serif;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.125rem;
        width: min-content;

        &:active {
            border: 0;
        }

        &:focus-visible {
            outline: none;
        }
    }
`
const Document = () => {
    const editorData: MarkdownEditorData = useMarkdownContext()
    const loadedDoc = editorData.loadedDoc
    const updateDocumentName: (newDocumentName: string) => void = editorData.updateDocumentName
    const [documentName, setDocumentName] = useState<string>(editorData.loadedDoc.name)
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)

    useEffect(() => {
        setDocumentName(loadedDoc.name)
    }, [loadedDoc])

    const docNameInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>()
    const editDocumentName = () => {
        console.log(`inside Document, editDocumentName`)
        const element: HTMLDivElement | null = docNameInputRef.current
        element?.removeAttribute('readOnly')
        console.log(`inside Document, editDocumentName, element=${JSON.stringify(element)}`)
    }

    useEffect(() => {
        const element: HTMLInputElement | null = docNameInputRef.current

        element?.addEventListener('change', () => setDocumentName(element?.value))
        element?.addEventListener('dblclick', () => setIsReadOnly(false))
        element?.addEventListener('blur', () => setIsReadOnly(true))
        element?.addEventListener('keydown', (event) => {
            if (!event.target) {
                return
            }

            if (event.key === 'Enter') {
                updateDocumentName(element.value)
                event.preventDefault()
                // event.stopPropagation()
            }
        })

        return () => {
            element?.removeEventListener('change', () => setDocumentName(element?.value))
            element?.removeEventListener('dblclick', () => setIsReadOnly(false))
            element?.removeEventListener('blur', () => setIsReadOnly(true))
        }
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(`inside Document.handleChange, event.target.value=${event.target.value}`)
        setDocumentName(event.target.value)
    }

    return (
        <DocumentDiv className="ml-6 mt-[18px] mb-5">
            <DocIcon />
            <input
                type={'text'}
                className={'filename ml-4'}
                value={documentName}
                readOnly={isReadOnly}
                ref={docNameInputRef}
                onChange={(e) => handleChange(e)}
            />
        </DocumentDiv>
    )
}

export default Document
