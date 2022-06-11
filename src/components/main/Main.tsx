import { useEffect, useState } from 'react'
import { MarkdownDocument } from '../../data/DataTypes'
import styles from './Main.module.scss'
import Markdown from './markdown/Markdown'
import Preview from './preview/Preview'
import ToggleMarkdownPreview from './toggle-markdown-preview/ToggleMarkdownPreview'

const Main = (props: {
    setLoadedDocumentContent: React.Dispatch<React.SetStateAction<string>>
    loadedDocumentContent: string
}) => {
    const [togglePreview, setTogglePreview] = useState(false)
    const loadedDocumentContent = props.loadedDocumentContent
    const setLoadedDocumentContent = props.setLoadedDocumentContent

    useEffect(() => {
        console.log(`inside Main.useEffect #1, loadedDocumentContent=${loadedDocumentContent}`)
        // setLoadedDocumentContent(props.loadedDocumentContent)
    }, [loadedDocumentContent])

    return (
        <main className={styles.main}>
            <ToggleMarkdownPreview togglePreview={togglePreview} setTogglePreview={setTogglePreview} />
            {togglePreview && (
                <Preview
                    loadedDocumentContent={loadedDocumentContent}
                    setLoadedDocumentContent={setLoadedDocumentContent}
                />
            )}
            {!togglePreview && (
                <Markdown
                    loadedDocumentContent={loadedDocumentContent}
                    setLoadedDocumentContent={setLoadedDocumentContent}
                />
            )}
        </main>
    )
}

export default Main
