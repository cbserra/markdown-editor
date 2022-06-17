import styled from 'styled-components'
import { ReactComponent as DeleteIcon } from '../../../images/icon-delete.svg'

const DeleteBtn = styled.button``
const Delete = () => {
    return (
        <DeleteBtn className="items-center flex h-10 text-neutral-500 justify-center ml-auto w-10">
            <DeleteIcon />
        </DeleteBtn>
    )
}

export default Delete
