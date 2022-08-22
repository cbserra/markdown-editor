import { useContext, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { MarkdownDocument } from '../../../types/MarkdownTypes'

export default function NewDocument() {
    const { setLoadedDocument, createNewDocument } = useContext(MarkdownContext)
    const [show, setShow] = useState(false)

    const createAndSetNewDocument = (): void => {
        const newDoc: MarkdownDocument = createNewDocument()
        setLoadedDocument(newDoc)
        setShow(true)
    }

    return (
        <>
            <ToastContainer position="top-center" className="mt-14 ">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} className={'shadow-lg'} autohide>
                    <Toast.Header closeButton={false} className="bg-orange-idle text-neutral-300 text-md font-serif">
                        <strong className="me-auto">New Document Created!</strong>
                    </Toast.Header>
                    <Toast.Body className="font-sans text-md font-semibold bg-opacity-75 bg-neutral-300 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
                        Make sure to click the &apos;Save&apos; button! <i className="fa-solid fa-arrow-right"></i>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <button
                className={
                    'new-document mb-6 bg-orange-idle hover:bg-orange-hover rounded-[4px] text-neutral-100 font-sans text-[15px] leading-[18px] font-normal px-8 py-3 text-center min-w-full'
                }
                onClick={createAndSetNewDocument}
            >
                + New Document
            </button>
        </>
    )
}
