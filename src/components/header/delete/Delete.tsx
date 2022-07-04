import { useContext } from 'react'
import styled from 'styled-components'
import MarkdownDocumentContext from '../../../contexts/MarkdownDocumentContext'
import { ReactComponent as DeleteIcon } from '../../../images/icon-delete.svg'
import cx from 'classnames'

const DeleteBtn = styled.button``
const Delete = (props: {
    openDeleteModal: boolean
    toggleOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { loadedDocument } = useContext(MarkdownDocumentContext)
    const toggleOpenDeleteModal = props.toggleOpenDeleteModal
    const openDeleteModal = props.openDeleteModal

    return (
        <>
            <DeleteBtn
                className={cx(
                    'items-center flex h-10 text-neutral-500 justify-center ml-auto w-10',
                    `${loadedDocument.readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
                )}
                onClick={() => toggleOpenDeleteModal(!openDeleteModal)}
                disabled={loadedDocument.readOnly}
            >
                <DeleteIcon />
            </DeleteBtn>
        </>
    )
}

export default Delete
