import styled from 'styled-components'
import { ReactComponent as DeleteIcon } from '../../../images/icon-delete.svg'
import DeleteModal from './DeleteModal'

const DeleteBtn = styled.button``
const Delete = (props: {
    openDeleteModal: boolean
    toggleOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const toggleOpenDeleteModal = props.toggleOpenDeleteModal
    const openDeleteModal = props.openDeleteModal

    return (
        <>
            <DeleteBtn
                className="items-center flex h-10 text-neutral-500 justify-center ml-auto w-10"
                onClick={() => toggleOpenDeleteModal(!openDeleteModal)}
            >
                <DeleteIcon />
            </DeleteBtn>
        </>
    )
}

export default Delete
