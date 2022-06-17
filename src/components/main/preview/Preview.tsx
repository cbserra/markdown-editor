import { marked } from 'marked'
import { useEffect, useState } from 'react'
import cx from 'classnames'

const Preview = (props: { markdownData: string }) => {
    const [parsedMarkdown, setParsedMarkdown] = useState<string>(marked.parse(props.markdownData))

    useEffect(() => {
        setParsedMarkdown(marked.parse(props.markdownData))
    }, [props.markdownData])

    return (
        <div
            className={cx('preview', 'text-neutral-500', 'dark:text-neutral-400')}
            dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
        ></div>
    )
}

export default Preview
