import styled from 'styled-components'
import cx from 'classnames'
import { ReactComponent as CloseIcon } from '../../../images/icon-close.svg'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { useContext } from 'react'
import Overlay from '../../overlay/Overlay'
import useAxios from 'axios-hooks'
import { MarkdownDocument } from '../../../types/MarkdownTypes'

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

    const [{ data, loading, error, response }, executeDelete] = useAxios<MarkdownDocument>(
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
                console.log('🚀 ~ file: DeleteModal.tsx ~ line 122 ~ executeDelete ~ resp', resp)

                const updatedDocs = markdownDocuments.filter((doc) => doc.id !== id)
                setMarkdownDocuments([...updatedDocs])
                setLoadedDocument(loadNextDocument(updatedDocs))
                toggleOpenDeleteModal((prevValue) => !prevValue)
            })
            .catch(console.error)
    }

    return (
        <Overlay showOrHide={openDeleteModal}>
            <ModalDiv
                className={
                    'flex flex-col justify-between rounded-[4px] p-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 my-auto w-[343px]'
                }
            >
                <button
                    className=" text-neutral-500 dark:text-neutral-400 w-4 h-4 self-end"
                    onClick={() => toggleOpenDeleteModal(!openDeleteModal)}
                >
                    <CloseIcon className="" />
                </button>
                <h4 className="font-serif text-[1.25rem] font-bold leading-[1.625rem] text-neutral-700 dark:text-neutral-100">
                    Delete this document?
                </h4>
                <p className="font-serif text-[.875rem] font-normal leading-[1.5rem] my-3 text-neutral-500 dark:text-neutral-400">
                    Are you sure you want to delete the &apos;{loadedDocument.name}&apos; document and its contents?
                    This action cannot be reversed.
                </p>
                {error && (
                    <div className="flex items-start justify-start gap-2">
                        <span className="text-orange-hover py-1 px-1">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </span>
                        <p className="font-serif text-[.875rem] font-normal leading-[1.5rem] text-neutral-500 mb-3 dark:text-neutral-400">
                            There was an error deleting the document: {error.message}
                        </p>
                    </div>
                )}
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
            </ModalDiv>
        </Overlay>
    )
}
export default DeleteModal
