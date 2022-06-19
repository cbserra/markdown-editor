import styled from 'styled-components'
import cx from 'classnames'

const OverlayDiv = styled.div``
const ModalDiv = styled.div``
const DeleteModal = (props: {
    openDeleteModal: boolean
    toggleOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const toggleOpenDeleteModal = props.toggleOpenDeleteModal
    const openDeleteModal = props.openDeleteModal

    return (
        <OverlayDiv
            className={cx(
                'absolute items-center justify-center h-full w-full bg-opacity-50 bg-neutral-1000 dark:bg-opacity-50 dark:bg-neutral-500',
                `${openDeleteModal ? 'flex' : 'hidden'}`,
            )}
        >
            <ModalDiv
                className={'preview relative rounded-[4px] p-6 bg-neutral-100 dark:bg-neutral-900 my-auto w-[343px]'}
            >
                <h4>Delete this document?</h4>
                <p>
                    Are you sure you want to delete the ‘welcome.md’ document and its contents? This action cannot be
                    reversed.
                </p>
                <button
                    className={'bg-orange-idle text-neutral-100 text-md w-full py-3 rounded-[4px]'}
                    onClick={() => toggleOpenDeleteModal(!openDeleteModal)}
                >
                    Confirm &amp; Delete
                </button>
            </ModalDiv>
        </OverlayDiv>
    )
}

export default DeleteModal
