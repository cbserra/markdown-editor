import dateFormat from 'dateformat'
import { useCallback, useContext, useEffect, useRef } from 'react'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { MarkdownDocument, DATE_FORMAT } from '../../../types/MarkdownTypes'

const DEFAULT_DOC_NAME = 'untitled-document'

export default function NewDocument() {
    const { markdownDocuments, setLoadedDocument } = useContext(MarkdownContext)

    useEffect(() => {
        console.log('🚀 ~ file: NewDocument.tsx ~ line 14 ~ useEffect ~ markdownDocuments CHANGED', markdownDocuments)
    }, [markdownDocuments])

    const createNewDocument = (): MarkdownDocument => {
        console.log('🚀 ~ file: NewDocument.tsx ~ line 12 ~ createNewDocument ~ markdownDocuments', markdownDocuments)
        const count: number = markdownDocuments.filter((doc) => doc.name.startsWith(DEFAULT_DOC_NAME)).length
        const docSuffix: string = count > 0 ? `(${count})` : ''

        const nextId: number =
            markdownDocuments
                .map((doc) => doc.id)
                .reduce(function (a, b) {
                    return Math.max(a, b)
                }, 0) + 1
        console.log('🚀 ~ file: NewDocument.tsx ~ line 85 ~ //useCallback ~ nextId', nextId)

        const newDoc: MarkdownDocument = {
            createdAt: dateFormat(new Date(), DATE_FORMAT as string),
            name: `${DEFAULT_DOC_NAME}${docSuffix}.md`,
            content: '',
            id: nextId,
        }
        console.log('🚀 ~ file: NewDocument.tsx ~ line 93 ~ //useCallback ~ newDoc', newDoc)

        return newDoc
    }

    const createAndSetNewDocument = (): void => {
        const newDoc: MarkdownDocument = createNewDocument()
        setLoadedDocument(newDoc)
        console.log('🚀 ~ file: NewDocument.tsx ~ line 60 ~ createAndSetNewDocument ~ newDoc', newDoc)
    }

    // const newDocumentRef = useRef<HTMLButtonElement>(null)
    // useEffect(() => {
    //     const element = newDocumentRef.current
    //     element?.addEventListener('click', createAndSetNewDocument)
    //     console.log('🚀 ~ file: NewDocument.tsx ~ line 65 ~ useEffect ~ element', element)

    //     return () => {
    //         element?.removeEventListener('click', createAndSetNewDocument)
    //     }
    // })

    return (
        <button
            className={
                'new-document mb-6 bg-orange-idle hover:bg-orange-hover rounded-[4px] text-neutral-100 font-sans text-[15px] leading-[18px] font-normal px-8 py-3 text-center min-w-full'
            }
            // ref={newDocumentRef}
            onClick={createAndSetNewDocument}
        >
            + New Document
        </button>
    )
}
