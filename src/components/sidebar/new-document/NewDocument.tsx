import { useContext } from 'react'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { MarkdownDocument } from '../../../types/MarkdownTypes'

export default function NewDocument() {
    const { setLoadedDocument, createNewDocument } = useContext(MarkdownContext)

    const createAndSetNewDocument = (): void => {
        const newDoc: MarkdownDocument = createNewDocument()
        setLoadedDocument(newDoc)
    }

    return (
        <button
            className={
                'new-document mb-6 bg-orange-idle hover:bg-orange-hover rounded-[4px] text-neutral-100 font-sans text-[15px] leading-[18px] font-normal px-8 py-3 text-center min-w-full'
            }
            onClick={createAndSetNewDocument}
        >
            + New Document
        </button>
    )
}
