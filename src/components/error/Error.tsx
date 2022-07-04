import { AxiosError } from 'axios'
import Overlay from '../overlay/Overlay'

const Error = (props: { error: AxiosError }) => {
    return (
        <Overlay showOrHide={true}>
            <div className="fa-1x flex items-center justify-center rounded-[4px] p-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 my-auto min-w-min gap-2">
                <span className="bg-orange-idle rounded-[4px] px-2 py-1">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </span>
                <p className="font-sans text-[.875rem] font-normal leading-[1.5rem]">
                    {props.error.message} occurred attetmpting to access {props.error.config.url}
                </p>
            </div>
        </Overlay>
    )
}

export default Error
