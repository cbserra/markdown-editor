import dateFormat from 'dateformat'
import { useCallback, useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import styles from './App.module.scss'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Sidebar from './components/sidebar/Sidebar'
import data from './data/data.json'
import { MarkdownDocument } from './data/DataTypes'
import { useTheme } from './hooks/useTheme'
import styled, { ThemeProvider } from 'styled-components'

function App() {
    const { currentTheme, themeLoaded, setMode } = useTheme()
    const importedData = data
    const [lsMarkdownDocuments, setLsMarkdownDocuments] = useLocalStorage<MarkdownDocument[]>(
        'markdownDocuments',
        importedData || [],
    )
    const createNewDocument = (): MarkdownDocument => {
        const count = lsMarkdownDocuments.filter((doc) => doc.name.startsWith('untitled-document')).length
        const docSuffix = count > 0 ? `(${count})` : ''

        return {
            createdAt: dateFormat(new Date(), 'dd mmmm yyyy'),
            name: `untitled-document${docSuffix}.md`,
            content: '',
        }
    }

    const [openClassname, setOpenClassname] = useState('')
    const [loadedDocument, setLoadedDocument] = useLocalStorage<MarkdownDocument>('loadedDoc', lsMarkdownDocuments[1])
    const slideClassname = styles.slide
    const [loadedDocumentContent, setLoadedDocumentContent] = useState<string>(loadedDocument.content)
    const [darkMode, isDarkMode] = useState<boolean>(false)

    useEffect(() => {
        console.log(`inside App.useEffect #1, loadedDocumentContent=${loadedDocumentContent}`)
    }, [loadedDocumentContent])

    useEffect(() => {
        console.log(
            `inside App.useEffect #2, loadedDocument was modified. loadedDocument=${JSON.stringify(loadedDocument)}`,
        )
        setLoadedDocumentContent(loadedDocument.content)
    }, [loadedDocument])

    useEffect(() => {
        console.log(
            `inside App.useEffect #3, lsMarkdownDocuments were modified. lsMarkdownDocuments=${JSON.stringify(
                lsMarkdownDocuments,
            )}`,
        )
    }, [lsMarkdownDocuments])

    const saveDocument = useCallback(() => {
        if (!loadedDocument) return

        // const markdownDocuments = [...lsMarkdownDocuments]
        // console.log(`in saveDocument, markdownDocuments=${JSON.stringify(markdownDocuments)}`)

        const loadedDoc = Object.assign({}, loadedDocument)
        console.log(`in saveDocument, loadedDoc=${JSON.stringify(loadedDoc)}`)
        loadedDoc.content = loadedDocumentContent
        setLoadedDocument(loadedDoc)
        console.log(`in saveDocument, loadedDocumentContent=${JSON.stringify(loadedDocumentContent)}`)

        console.log(`inside saveDocument, loadedDocument=${JSON.stringify(loadedDocument)}`)

        const markdownDocuments = [...lsMarkdownDocuments]
        if (markdownDocuments.filter((doc) => doc.name === loadedDocument.name).length > 0) {
            console.log(`found loadedDocument inside markdownDocuments`)
            markdownDocuments.forEach((doc, index) => {
                // console.log(`doc=${JSON.stringify(doc)}, $loadedFile=${JSON.stringify(loadedDocument)}`)
                if (doc.name === loadedDocument.name && doc.createdAt === loadedDocument.createdAt) {
                    console.log(`found doc in array, updating content`)
                    markdownDocuments[index].content = loadedDocument.content
                }
            })
            setLsMarkdownDocuments([...markdownDocuments])
        } else {
            console.log(`adding loadedDocument to lsMarkdownDocuments`)
            setLsMarkdownDocuments([...markdownDocuments, loadedDocument])
        }
    }, [loadedDocument, loadedDocumentContent, lsMarkdownDocuments])

    // useEffect(() => {
    //     setLoadedDocumentContent(loadedDocument.content)
    // }, [loadedDocument])

    return (
        <>
            {themeLoaded && (
                // <ThemeProvider theme={{currentTheme}}>
                <div className={styles.app}>
                    <Sidebar
                        setOpenClassname={setOpenClassname}
                        data={lsMarkdownDocuments}
                        setLoadedDocument={setLoadedDocument}
                        createNewDocument={createNewDocument}
                        setMode={setMode}
                    />
                    <div id="main-container" className={styles['main-container']}>
                        <Header
                            slideClassname={slideClassname}
                            openClassname={openClassname}
                            loadedFile={loadedDocument}
                            saveDocument={saveDocument}
                        />
                        <Main
                            setLoadedDocumentContent={setLoadedDocumentContent}
                            loadedDocumentContent={loadedDocumentContent}
                        />
                    </div>
                </div>
                // </ThemeProvider>
            )}
        </>
    )
}

export default App
