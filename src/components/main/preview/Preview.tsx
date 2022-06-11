import styles from './Preview.module.scss'
import { marked } from 'marked'
import { useEffect, useState } from 'react'

const Preview = (props: {
    loadedDocumentContent: string
    setLoadedDocumentContent: React.Dispatch<React.SetStateAction<string>>
}) => {
    const loadedDocumentContent = props.loadedDocumentContent
    const [parsedMarkdown, setParsedMarkdown] = useState<string>('')

    useEffect(() => {
        setParsedMarkdown(marked.parse(loadedDocumentContent))
    }, [loadedDocumentContent])

    return <div className={styles.preview} dangerouslySetInnerHTML={{ __html: parsedMarkdown }}></div>
}

export default Preview
