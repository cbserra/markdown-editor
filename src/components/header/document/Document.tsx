import cx from 'classnames'
import { ChangeEvent, createRef, RefObject, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as DocIcon } from '../../../images/icon-document.svg'

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
const Document = (props: { documentName: string; setDocumentName: React.Dispatch<SetStateAction<string>> }) => {
    const documentName = props.documentName
    const setDocumentName = props.setDocumentName
    const [localDocumentName, setLocalDocumentName] = useState<string>(documentName)
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)

    useEffect(() => {
        setLocalDocumentName(documentName)
    }, [documentName])

    useEffect(() => {
        setDocumentName(localDocumentName)
    }, [localDocumentName])

    const docNameInputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>()
    // const editDocumentName = () => {
    //     console.log(`inside Document, editDocumentName`)
    //     const element: HTMLDivElement | null = docNameInputRef.current
    //     element?.removeAttribute('readOnly')
    //     console.log(`inside Document, editDocumentName, element=${JSON.stringify(element)}`)
    // }

    useEffect(() => {
        const element: HTMLInputElement | null = docNameInputRef.current

        // element?.addEventListener('change', () => setDocumentName(element?.value))
        element?.addEventListener('focus', () => setIsReadOnly(false))
        element?.addEventListener('blur', () => setIsReadOnly(true))
        // element?.addEventListener('keydown', (event) => {
        //     if (!event.target) {
        //         return
        //     }

        //     if (event.key === 'Enter') {
        //         updateDocumentName(element.value)
        //         event.preventDefault()
        //         event.stopPropagation()
        //     }
        // })

        return () => {
            // element?.removeEventListener('change', () => setDocumentName(element?.value))
            element?.removeEventListener('focus', () => setIsReadOnly(false))
            element?.removeEventListener('blur', () => setIsReadOnly(true))
        }
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('🚀 ~ file: Document.tsx ~ line 89 ~ handleChange ~ event', event)
        setLocalDocumentName(event.target.value)
    }

    return (
        <DocumentDiv className="h-full ml-6">
            <DocIcon />
            <div className="filename-wrapper flex flex-col h-9 pl-4 justify-center">
                <label
                    className="sm:hidden md:inline lg:inline document-name text-xs text-neutral-500 font-light mb-1"
                    htmlFor="filename"
                >
                    Document Name
                </label>
                <input
                    type={'text'}
                    className={cx('filename active:border-0 focus-visible:outline-none', {
                        'bg-transparent-0 border-b-[1px] border-b-neutral-100 caret-orange-idle': !isReadOnly,
                    })}
                    value={documentName}
                    readOnly={isReadOnly}
                    ref={docNameInputRef}
                    id={'filename'}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </DocumentDiv>
    )
}

export default Document
