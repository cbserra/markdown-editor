import { ChangeEvent, useEffect, useState } from 'react'
import styles from './Markdown.module.scss'

const Markdown = (props: {
    loadedDocumentContent: string
    setLoadedDocumentContent: React.Dispatch<React.SetStateAction<string>>
}) => {
    const setLoadedDocumentContent = props.setLoadedDocumentContent
    const loadedDocumentContent = props.loadedDocumentContent
    const [markdownData, setMarkdownData] = useState<string>(props.loadedDocumentContent)

    useEffect(() => {
        console.log(`inside Markdown.useEffect #1, markdownData=${markdownData}`)
        setLoadedDocumentContent(markdownData)
    }, [markdownData, setLoadedDocumentContent])

    useEffect(() => {
        console.log(`inside Markdown.useEffect #2, loadedDocumentContent=${loadedDocumentContent}`)
        setMarkdownData(loadedDocumentContent)
    }, [setMarkdownData, loadedDocumentContent])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(`inside Markdown.handleChange, event.target.value=${event.target.value}`)
        setMarkdownData(event.target.value)
    }

    //   console.log(`inside Markdown, markdownData=${markdownData}`);

    return (
        <div className={styles.markdown}>
            <textarea value={markdownData} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default Markdown
