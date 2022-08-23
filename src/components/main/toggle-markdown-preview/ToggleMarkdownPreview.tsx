import { ReactComponent as HidePreview } from '../../../images/icon-hide-preview.svg'
import { ReactComponent as ShowPreview } from '../../../images/icon-show-preview.svg'
import cx from 'classnames'
import Markdown from '../markdown/Markdown'
import Preview from '../preview/Preview'

const ToggleMarkdownPreview = (props: {
    togglePreview: boolean
    setTogglePreview: React.Dispatch<React.SetStateAction<boolean>>
    markdownData: string
    setMarkdownData: React.Dispatch<React.SetStateAction<string>>
}) => {
    const togglePreview = props.togglePreview
    const setTogglePreview = props.setTogglePreview
    const markdownData = props.markdownData

    return (
        <div className="toggle-preview flex items-stretch h-full w-full">
            {
                <div
                    className={cx(
                        'markdown-wrapper h-full flex-col',
                        `${togglePreview ? 'hidden' : 'flex w-full  md:w-1/2'}`,
                    )}
                >
                    <div
                        className={cx(
                            'markdown-heading markdown-preview-utils h-[2.625rem] px-2',
                            'bg-neutral-200 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400',
                        )}
                    >
                        <span>Markdown</span>
                        <button className={'md:hidden hover:text-orange-idle'}>
                            <ShowPreview
                                title="show preview"
                                onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                            />
                        </button>
                    </div>
                    <Markdown />
                </div>
            }
            {
                <div
                    className={cx(
                        'preview-wrapper  h-full flex-col',
                        `${
                            togglePreview
                                ? 'flex md:mx-auto w-full'
                                : 'hidden md:flex md:w-1/2 md:border-l-[1px] border-l-neutral-300 dark:border-l-neutral-600'
                        }`,
                    )}
                >
                    <div
                        className={cx(
                            'preview-heading markdown-preview-utils h-[2.625rem] px-2',
                            'bg-neutral-200 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400',
                        )}
                    >
                        <span>Preview</span>
                        <button className={cx('hover:text-orange-idle', `${!togglePreview ? 'block' : 'hidden'}`)}>
                            <ShowPreview
                                title="show preview"
                                onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                            />
                        </button>
                        <button className={cx('hover:text-orange-idle', `${togglePreview ? 'block' : 'hidden'}`)}>
                            <HidePreview
                                title="hide preview"
                                onClick={() => setTogglePreview((prevValue: boolean) => !prevValue)}
                            />
                        </button>
                    </div>
                    <Preview togglePreview={togglePreview} markdownData={markdownData} />
                </div>
            }
        </div>
    )
}

export default ToggleMarkdownPreview
