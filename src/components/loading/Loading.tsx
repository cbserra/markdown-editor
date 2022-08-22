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

const Loading = () => {
    return (
        // <div className="fixed flex z-50 items-center justify-center h-full w-full bg-opacity-50 bg-neutral-1000 dark:bg-opacity-50 dark:bg-neutral-500">
        <Modal
            open={true}
            onClose={() => {}}
            // closeOnOverlayClick={true}
            // closeOnEsc={true}
            // closeIcon={closeIcon}
            showCloseIcon={false}
            center
            classNames={{
                overlay: 'custom-react-responsive-modal-overlay',
                modal: 'custom-react-responsive-modal-modal',
            }}
        >
            <div
                className={
                    'flex flex-col bg-orange-idle  justify-between rounded-[15px] p-6 text-neutral-400 my-auto w-[343px]'
                }
            >
                <div className="fa-3x">
                    <i className="inline-block fa-solid fa-cog fa-spin"></i>
                    <h1 className="inline-block font-serif">Loading...</h1>
                </div>
            </div>
        </Modal>
    )
}

export default Loading
