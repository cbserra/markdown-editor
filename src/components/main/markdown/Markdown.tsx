import { ChangeEvent, useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'

const Markdown = () => {
    const { loadedDocument, setLoadedDocument } = useContext(MarkdownContext)
    const [markdownData, setMarkdownData] = useState(loadedDocument.content)

    useEffect(() => {
        setMarkdownData(loadedDocument.content)
    }, [loadedDocument.content])

    useEffect(() => {
        const updatedDoc = Object.assign({}, loadedDocument)
        updatedDoc.content = markdownData
        setLoadedDocument(updatedDoc)
    }, [markdownData])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownData(event.target.value)
    }

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
                disabled={loadedDocument.readOnly}
            />
        </div>
    )
}

export default Markdown
