import cx from 'classnames'
import { ChangeEvent, createRef, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { ReactComponent as DocIcon } from '../../../images/icon-document.svg'

const DocumentDiv = styled.div``
const Document = () => {
    const { loadedDocument, setLoadedDocument } = useContext(MarkdownContext)
    const [localDocumentName, setLocalDocumentName] = useState<string>(loadedDocument.name)
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)

    useEffect(() => {
        setLocalDocumentName(loadedDocument.name)
    }, [loadedDocument.name])

    useEffect(() => {
        const updatedDoc = Object.assign({}, loadedDocument)
        updatedDoc.name = localDocumentName

        setLoadedDocument(updatedDoc)
    }, [localDocumentName])

    // const docNameInputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    // useEffect(() => {
    //     const element: HTMLInputElement | null = docNameInputRef.current

    //     // element?.addEventListener('change', () => setDocumentName(element?.value))
    //     element?.addEventListener('focus', () => setIsReadOnly(false))
    //     element?.addEventListener('blur', () => setIsReadOnly(true))

    //     return () => {
    //         // element?.removeEventListener('change', () => setDocumentName(element?.value))
    //         element?.removeEventListener('focus', () => setIsReadOnly(false))
    //         element?.removeEventListener('blur', () => setIsReadOnly(true))
    //     }
    // })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('🚀 ~ file: Document.tsx ~ line 89 ~ handleChange ~ event', event)
        setLocalDocumentName(event.target.value)
    }

    return (
        <DocumentDiv className="flex items-center justify-start h-full ml-6 md:w-64">
            <DocIcon />
            <div className="filename-wrapper relative flex flex-col h-9 pl-4 justify-center">
                <label
                    className="hidden md:inline lg:inline document-name text-xs text-neutral-500 font-light mb-1"
                    htmlFor="filename"
                >
                    Document Name
                </label>
                <input
                    type={'text'}
                    className={cx(
                        'filename peer border-opacity-0 border-0  bg-transparent-0 text-neutral-100',
                        'w-44 md:w-64 lg:w-96',
                        'focus-visible:outline-0 active:border-0 focus-visible:outline-none',
                        'focus:caret-orange-idle',
                        //: !isReadOnly,
                        // },
                    )}
                    value={localDocumentName}
                    readOnly={isReadOnly}
                    // ref={docNameInputRef}
                    id={'filename'}
                    onChange={(e) => handleChange(e)}
                    onFocus={() => setIsReadOnly(false)}
                    onBlur={() => setIsReadOnly(true)}
                    autoFocus={!isReadOnly}
                />
                <span
                    className={cx(
                        'focus-border absolute origin-center bg-neutral-100',
                        'bottom-0 left-1/2 w-0 h-[1px]',
                        'transition-all duration-500',
                        'peer-focus:left-0 peer-focus:w-full',
                    )}
                ></span>
            </div>
        </DocumentDiv>
    )
}

export default Document
