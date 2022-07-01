import { useContext, useEffect, useState } from 'react'
import MarkdownContext from '../../contexts/MarkdownDocumentContext'
import ToggleMarkdownPreview from './toggle-markdown-preview/ToggleMarkdownPreview'

const Main = () => {
    const { loadedDocument, setLoadedDocument } = useContext(MarkdownContext)
    const [togglePreview, setTogglePreview] = useState(false)
    const [localMarkdownContent, setLocalMarkdownContent] = useState(loadedDocument.content)

    useEffect(() => {
        const newLoadedDoc = Object.assign({}, loadedDocument)
        newLoadedDoc.content = localMarkdownContent
        setLoadedDocument(newLoadedDoc)
        console.log('🚀 ~ file: Main.tsx ~ line 19 ~ useEffect ~ newLoadedDoc', newLoadedDoc)
    }, [localMarkdownContent])

    useEffect(() => {
        setLocalMarkdownContent(loadedDocument.content)
        console.log('🚀 ~ file: Main.tsx ~ line 32 ~ useEffect ~ setLocalMarkdownContent', setLocalMarkdownContent)
    }, [loadedDocument.content])

    return (
        <main className={'h-full w-full overflow-x-hidden overflow-y-auto'}>
            <ToggleMarkdownPreview
                togglePreview={togglePreview}
                setTogglePreview={setTogglePreview}
                markdownData={localMarkdownContent}
                setMarkdownData={setLocalMarkdownContent}
            />
        </main>
    )
}

export default Main
