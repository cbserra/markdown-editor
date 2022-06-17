import { ChangeEvent, useEffect, useState } from 'react'

const Markdown = (props: { markdownData: string; setMarkdownData: React.Dispatch<React.SetStateAction<string>> }) => {
    const markdownData = props.markdownData
    const setMarkdownData = props.setMarkdownData
    const [localMarkdownData, setLocalMarkdownData] = useState<string>(markdownData)

    useEffect(() => {
        setMarkdownData(localMarkdownData)
        console.log('🚀 ~ file: Markdown.tsx ~ line 16 ~ useEffect ~ localMarkdownData', localMarkdownData)
    }, [localMarkdownData])

    useEffect(() => {
        setLocalMarkdownData(markdownData)
        console.log('🚀 ~ file: Markdown.tsx ~ line 18 ~ useEffect ~ markdownData', markdownData)
    }, [markdownData])

    // useEffect(() => {
    //     console.log(`inside Markdown.useEffect #2, localMarkdownContent=${localMarkdownContent}`)
    //     setLocalMarkdownContent(localMarkdownContent)
    // }, [setLocalMarkdownContent, localMarkdownContent])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        console.log('🚀 ~ file: Markdown.tsx ~ line 34 ~ handleChange ~ event', event)
        setLocalMarkdownData(event.target.value)
    }

    //   console.log(`inside Markdown, markdownData=${markdownData}`);

    return (
        <div className={'markdown'}>
            <textarea
                className={
                    'h-full w-full border-0 font-mono text-sm font-normal bg-neutral-100 text-neutral-1000 dark:bg-neutral-1000 dark:text-neutral-100'
                }
                value={localMarkdownData}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

export default Markdown
