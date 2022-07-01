import { ChangeEvent, useEffect, useState } from 'react'
import cx from 'classnames'

const Markdown = (props: { markdownData: string; setMarkdownData: React.Dispatch<React.SetStateAction<string>> }) => {
    const markdownData = props.markdownData
    const setMarkdownData = props.setMarkdownData
    // const [localMarkdownData, setLocalMarkdownData] = useState<string>(markdownData)

    useEffect(() => {
        setMarkdownData(markdownData)
        console.log('🚀 ~ file: Markdown.tsx ~ line 16 ~ useEffect ~ markdownData', markdownData)
    }, [markdownData])

    // useEffect(() => {
    //     setLocalMarkdownData(markdownData)
    //     console.log('🚀 ~ file: Markdown.tsx ~ line 18 ~ useEffect ~ markdownData', markdownData)
    // }, [markdownData])

    // useEffect(() => {
    //     console.log(`inside Markdown.useEffect #2, localMarkdownContent=${localMarkdownContent}`)
    //     setLocalMarkdownContent(localMarkdownContent)
    // }, [setLocalMarkdownContent, localMarkdownContent])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        console.log('🚀 ~ file: Markdown.tsx ~ line 34 ~ handleChange ~ event', event)
        setMarkdownData(event.target.value)
    }

    //   console.log(`inside Markdown, markdownData=${markdownData}`);

    return (
        <div className={'markdown h-full px-4 py-3'}>
            <textarea
                className={cx(
                    'appearance-none h-full w-full border-0',
                    'dark:bg-neutral-1000 dark:text-neutral-100',
                    'font-mono text-[14px] leading-6 font-normal bg-neutral-100 text-neutral-1000',
                    'focus-visible:outline-0 active:border-0 focus-visible:outline-none',
                )}
                value={markdownData}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

export default Markdown
