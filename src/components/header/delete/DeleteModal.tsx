import styled from 'styled-components'
import cx from 'classnames'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { useContext } from 'react'
import useAxios from 'axios-hooks'
import { MarkdownDocument } from '../../../types/MarkdownTypes'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

const closeIcon = (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
            <path d="M2.1.686 23.315 21.9l-1.415 1.415L.686 2.1z" />
            <path d="M.686 21.9 21.9.685l1.415 1.415L2.1 23.314z" />
        </g>
    </svg>
)

const ModalDiv = styled.div``
const DeleteModal = (props: {
    openDeleteModal: boolean
    toggleOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const toggleOpenDeleteModal = props.toggleOpenDeleteModal
    const openDeleteModal = props.openDeleteModal
    const { loadedDocument, setLoadedDocument, markdownDocuments, setMarkdownDocuments, createNewDocument } =
        useContext(MarkdownContext)

    const loadNextDocument = (updatedDocs: MarkdownDocument[]): MarkdownDocument => {
        return updatedDocs.length > 0 ? updatedDocs[0] : createNewDocument()
    }

    const [{ loading, error }, executeDelete] = useAxios<MarkdownDocument>(
        {
            url: `/${loadedDocument.id}`,
            method: 'DELETE',
        },
        { manual: true },
    )

    const deleteDocument = async (): Promise<void> => {
        const id = loadedDocument.id
        await executeDelete()
            .then((resp) => {
                console.log('🚀 ~ file: DeleteModal.tsx ~ executeDelete ~ resp', resp)

                const updatedDocs = markdownDocuments.filter((doc) => doc.id !== id)
                setMarkdownDocuments([...updatedDocs])
                setLoadedDocument(loadNextDocument(updatedDocs))
                toggleOpenDeleteModal((prevValue) => !prevValue)
            })
            .catch(console.error)
    }

    return (
        <Modal
            open={openDeleteModal}
            onClose={() => toggleOpenDeleteModal((prevValue) => !prevValue)}
            closeOnOverlayClick={true}
            closeOnEsc={true}
            closeIcon={closeIcon}
            center
            classNames={{
                overlay: 'custom-react-responsive-modal-overlay',
                modal: 'custom-react-responsive-modal-modal',
            }}
        >
            <ModalDiv className={'flex flex-col justify-between rounded-[4px] p-6 my-auto w-[343px]'}>
                <h4 className="font-serif text-[1.25rem] font-bold leading-[1.625rem] text-neutral-700 dark:text-neutral-100">
                    Delete this document?
                </h4>
                <p className="font-serif text-[.875rem] font-normal leading-[1.5rem] my-3 text-neutral-500 dark:text-neutral-400">
                    Are you sure you want to delete the &apos;{loadedDocument.name}&apos; document and its contents?
                    This action cannot be reversed.
                </p>
                {error ? (
                    <div className="flex items-start justify-start gap-2">
                        <span className="text-orange-hover py-1 px-1">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </span>
                        <p className="font-serif text-[.875rem] font-normal leading-[1.5rem] text-neutral-500 mb-3 dark:text-neutral-400">
                            There was an error deleting the document: {error.message}
                        </p>
                    </div>
                ) : (
                    <button
                        className={cx(
                            'bg-orange-idle hover:bg-orange-hover text-neutral-100 text-md w-full py-3 my-1 rounded-[4px]',
                            `${loading ? 'fa-fade' : ''}`,
                        )}
                        onClick={() => {
                            deleteDocument().catch(console.error)
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Confirm & Delete'}
                    </button>
                )}
            </ModalDiv>
        </Modal>
    )
}
export default DeleteModal
