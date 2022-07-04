import Overlay from '../overlay/Overlay'

const Loading = () => {
    return (
        // <div className="fixed flex z-50 items-center justify-center h-full w-full bg-opacity-50 bg-neutral-1000 dark:bg-opacity-50 dark:bg-neutral-500">
        <Overlay showOrHide={true}>
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
        </Overlay>
    )
}

export default Loading
