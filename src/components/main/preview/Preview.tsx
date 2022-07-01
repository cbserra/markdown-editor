import { marked } from 'marked'
import { useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'

const Preview = (props: { togglePreview: boolean; markdownData: string }) => {
    const { loadedDocument } = useContext(MarkdownContext)
    const [parsedMarkdown, setParsedMarkdown] = useState<string>(marked.parse(loadedDocument.content))

    useEffect(() => {
        setParsedMarkdown(marked.parse(props.markdownData))
    }, [props.markdownData])

    return (
        <div
            className={cx(
                'preview h-full flex-col px-4 py-3 overflow-auto',
                'text-neutral-500',
                'dark:text-neutral-400',
                `${props.togglePreview ? 'md:flex md:w-full lg:w-1/2 lg:mx-auto' : ''}`,
                // 'sm:w-full',
                // 'md:flex md:w-1/2',
            )}
            dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
        ></div>
    )
}

export default Preview
