import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
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

const Error = (props: {
    openModal: boolean
    error: AxiosError
    setError: React.Dispatch<React.SetStateAction<AxiosError<any, any> | null>>
}) => {
    const [open, setOpen] = useState<boolean>(props.openModal)
    const onCloseModal = () => {
        props.setError(null)
        setOpen(false)
    }

    useEffect(() => {
        console.log('open, Error:', open, props.error)
    }, [open, props.error])

    return (
        <Modal
            open={open}
            onClose={onCloseModal}
            closeOnOverlayClick={true}
            closeOnEsc={true}
            closeIcon={closeIcon}
            center
            classNames={{
                overlay: 'custom-react-responsive-modal-overlay',
                modal: 'custom-react-responsive-modal-modal',
            }}
        >
            <div className="fa-1x flex items-center justify-center p-5 my-auto gap-2">
                {/* <button className=" text-neutral-500 dark:text-neutral-400 w-2 h-2 self-end" onClick={onCloseModal}>
                    <CloseIcon className="" />
                </button> */}
                <span className="bg-orange-idle text-neutral-300 rounded-[4px] px-2 py-1">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </span>
                <p className="font-sans text-md font-bold">
                    {props.error.message} occurred attetmpting to access {props.error.config.url}
                </p>
            </div>
        </Modal>
    )
}

export default Error
