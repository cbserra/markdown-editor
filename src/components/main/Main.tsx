import { useEffect, useState } from 'react'
import { useMarkdownContext } from '../../contexts/MarkdownDocumentContext'
// import styles from './Main.module.scss'
import Markdown from './markdown/Markdown'
import Preview from './preview/Preview'
import ToggleMarkdownPreview from './toggle-markdown-preview/ToggleMarkdownPreview'

const Main = () => {
    const { loadedDoc, setLoadedDoc } = useMarkdownContext()
    const [togglePreview, setTogglePreview] = useState(false)
    const [localMarkdownContent, setLocalMarkdownContent] = useState(loadedDoc.content)
    // const [localLoadedDoc, setLocalLoadedDoc] = useState(loadedDoc)

    useEffect(() => {
        const newLoadedDoc = Object.assign({}, loadedDoc)
        newLoadedDoc.content = localMarkdownContent
        setLoadedDoc(newLoadedDoc)
        console.log('🚀 ~ file: Main.tsx ~ line 19 ~ useEffect ~ newLoadedDoc', newLoadedDoc)
    }, [localMarkdownContent])

    // useEffect(() => {
    //     const newLoadedDoc = Object.assign({}, localLoadedDoc)
    //     newLoadedDoc.content = localMarkdownContent
    //     console.log("🚀 ~ file: Main.tsx ~ line 27 ~ useEffect ~ newLoadedDoc", newLoadedDoc)

    //     setLocalLoadedDoc(newLoadedDoc)
    // }, [localMarkdownContent])

    useEffect(() => {
        setLocalMarkdownContent(loadedDoc.content)
        console.log('🚀 ~ file: Main.tsx ~ line 32 ~ useEffect ~ setLocalMarkdownContent', setLocalMarkdownContent)
    }, [loadedDoc])

    return (
        <main className={'h-full w-full overflow-y-hidden overflow-x-auto'}>
            <ToggleMarkdownPreview togglePreview={togglePreview} setTogglePreview={setTogglePreview} />
            {togglePreview && <Preview markdownData={localMarkdownContent} />}
            {!togglePreview && (
                <Markdown markdownData={localMarkdownContent} setMarkdownData={setLocalMarkdownContent} />
            )}
        </main>
    )
}

export default Main
