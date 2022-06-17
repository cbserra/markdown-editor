// import './ToggleMarkdownPreview.css'
import { ReactComponent as HidePreview } from '../../../images/icon-hide-preview.svg'
import { ReactComponent as ShowPreview } from '../../../images/icon-show-preview.svg'

const ToggleMarkdownPreview = (props: {
    togglePreview: boolean
    setTogglePreview: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const togglePreview = props.togglePreview
    const setTogglePreview = props.setTogglePreview

    return (
        <div className="toggle-preview flex items-stretch h-[2.625rem] w-full bg-neutral-200 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            {togglePreview && (
                <div className="preview markdown-preview-utils">
                    <span>Preview</span>
                    <HidePreview
                        title="hide preview"
                        onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                        className={'hover:text-button-idle'}
                    />
                    {/* <img
                        src={iconHidePreview}
                        alt="hide preview"
                        onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                    /> */}
                </div>
            )}
            {!togglePreview && (
                <div className="markdown markdown-preview-utils">
                    <span>Markdown</span>
                    <ShowPreview
                        title="show preview"
                        onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                        className={'hover:button-idle'}
                    />
                    {/* <img
                        src={iconShowPreview}
                        alt="show preview"
                        onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                    /> */}
                </div>
            )}
        </div>
    )
}

export default ToggleMarkdownPreview
