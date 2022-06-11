import './ToggleMarkdownPreview.css'
import iconHidePreview from '../../../images/icon-hide-preview.svg'
import iconShowPreview from '../../../images/icon-show-preview.svg'

const ToggleMarkdownPreview = (props: {
    togglePreview: boolean
    setTogglePreview: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const togglePreview = props.togglePreview
    const setTogglePreview = props.setTogglePreview

    return (
        <div className="toggle-preview">
            {togglePreview && (
                <div className="preview">
                    <span>Preview</span>
                    <img
                        src={iconHidePreview}
                        alt="hide preview"
                        onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                    />
                </div>
            )}
            {!togglePreview && (
                <div className="markdown">
                    <span>Markdown</span>
                    <img
                        src={iconShowPreview}
                        alt="show preview"
                        onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                    />
                </div>
            )}
        </div>
    )
}

export default ToggleMarkdownPreview
