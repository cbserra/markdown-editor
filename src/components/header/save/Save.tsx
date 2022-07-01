import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'
import { MarkdownDocument, MutableMarkdownDocument } from '../../../types/MarkdownTypes'
import { saveDoc, updateDoc } from '../../../api/MarkdownApi'

const ID_NOT_FOUND = -1

const SaveButton = styled.button``
const Save = () => {
    const { markdownDocuments, setMarkdownDocuments, loadedDocument, setLoadedDocument } = useContext(MarkdownContext)
    // const [localLoadedDocument, setLocalLoadedDocument] = useState<MarkdownDocument>(loadedDocument)
    // const [localMarkdownDocuments, setLocalMarkdownDocuments] = useState<MarkdownDocument[]>(markdownDocuments)

    // useEffect(() => {
    //     setLocalLoadedDocument(loadedDocument)
    // }, [loadedDocument])

    // useEffect(() => {
    //     setLocalMarkdownDocuments(markdownDocuments)
    // }, [markdownDocuments])

    // const getDocIndexIfPresent = (docs: MarkdownDocument[], updatedDoc: MarkdownDocument): number => {
    //     // A 'doc's id should match its imdex in the collection, so try that first
    //     const id = updatedDoc.id
    //     const targetIndex = id - 1
    //     console.log('🚀 ~ file: Save.tsx ~ line 41 ~ getDocIndexIfPresent ~ id', id)
    //     console.log('🚀 ~ file: Save.tsx ~ line 42 ~ getDocIndexIfPresent ~ targetIndex', targetIndex)
    //     if (docs[targetIndex]?.id === id) {
    //         console.log(
    //             '🚀 ~ file: Save.tsx ~ line 43 ~ getDocIndexIfPresent ~ docs[targetIndex]?.id === id',
    //             docs[targetIndex]?.id === id,
    //         )
    //         return targetIndex
    //     }

    //     docs.forEach((doc, index) => {
    //         console.log('🚀 ~ file: Save.tsx ~ line 48 ~ docs.forEach ~ doc, index', doc, index)
    //         if (doc.id === id) {
    //             return index
    //         }
    //     })

    //     return ID_NOT_FOUND
    // }

    // const updateDocuments = (oldDoc: MarkdownDocument, updates: MutableMarkdownDocument) => {
    //     const updatedDoc: MarkdownDocument = Object.assign({}, oldDoc)
    //     console.log('🚀 ~ file: Save.tsx ~ line 56 ~ updateDocuments ~ updatedDoc', updatedDoc)
    //     console.log('🚀 ~ file: Save.tsx ~ line 57 ~ updateDocuments ~ oldDoc', oldDoc)

    //     if (updates.content) {
    //         updatedDoc.content = updates.content
    //         console.log('🚀 ~ file: Save.tsx ~ line 124 ~ updateDocuments ~ updates.content', updates.content)
    //     }
    //     if (updates.name) {
    //         updatedDoc.name = updates.name
    //         console.log('🚀 ~ file: Save.tsx ~ line 128 ~ updateDocuments ~ updates.name', updates.name)
    //     }

    //     const localDocs = [...markdownDocuments]
    //     console.log('🚀 ~ file: Save.tsx ~ line 68 ~ updateDocuments ~ localDocs', localDocs)
    //     const index = localDocs.findIndex((doc) => doc.id === updatedDoc.id)
    //     if (index === -1) {
    //         console.log(
    //             '🚀 ~ file: Save.tsx ~ line 58 ~ updateDocuments ~ updatedDoc -- SAVING NEW DOCUMENT',
    //             updatedDoc,
    //         )
    //         setMarkdownDocuments([...localDocs, updatedDoc])
    //     } else {
    //         localDocs[index] = updatedDoc
    //         console.log(
    //             '🚀 ~ file: Save.tsx ~ line 65 ~ updateDocuments ~ localDocs -- UPDATED DOCUMENTS ARRAY',
    //             localDocs,
    //         )
    //         setMarkdownDocuments([...localDocs])
    //     }
    // }

    const saveDocument = async (): Promise<void> => {
        if (!loadedDocument) return
        console.log('🚀 ~ file: Save.tsx ~ line 84 ~ saveDocument ~ loadedDocument', loadedDocument)

        const docToSave = Object.assign({}, loadedDocument)
        const id = docToSave.id
        console.log('🚀 ~ file: Save.tsx ~ line 88 ~ saveDocument ~ docToSave', docToSave)
        if (markdownDocuments.filter((doc) => doc.id === docToSave.id).length > 0) {
            try {
                const response = await updateDoc(docToSave) //.catch(console.error)
                const docs = markdownDocuments.map((doc) => (doc.id === id ? { ...response.data } : doc))
                setMarkdownDocuments([...docs])
                console.log(response)
            } catch (error) {
                console.error(error)
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            // setMarkdownDocuments(markdownDocuments.map((doc) => (doc.id === docToSave.id ? { ...response.data } : doc)))
            // setLoadedDocument(resp.data as MarkdownDocument)
        } else {
            try {
                const response = await saveDoc(docToSave) //.catch(console.error)
                setMarkdownDocuments([...markdownDocuments, response.data])
                console.log(response)
            } catch (error) {
                console.error(error)
            }
            // setLoadedDocument(resp.data)
        }

        // setLoadedDocument(docToSave)

        // updateDocuments(docToSave, { name: docToSave.name, content: docToSave.content })
    }

    // const saveDocRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
    // useEffect(() => {
    //     console.log('🚀 ~ file: Save.tsx ~ line 83 ~ useEffect ~ loadedDocument', loadedDocument)

    //     const element: HTMLButtonElement | null = saveDocRef.current
    //     element?.addEventListener('click', () => {
    //         saveDocument().catch(console.error)
    //     })

    //     return () => {
    //         element?.removeEventListener('click', () => {
    //             saveDocument().catch(console.error)
    //         })
    //     }
    // })

    return (
        <SaveButton
            className={cx(
                'flex items-center bg-orange-idle rounded w-10 md:w-[9.5rem] h-10 m-1 justify-center text-neutral-100 ',
                'md:px-4 md:mx-2',
                `${loadedDocument.readOnly ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-hover cursor-pointer'}`,
            )}
            // ref={saveDocRef}
            onClick={() => {
                saveDocument().catch(console.error)
            }}
            disabled={loadedDocument.readOnly}
        >
            <SaveIcon />
            <span className="hidden md:inline pl-2 text-md">Save Changes</span>
        </SaveButton>
    )
}

export default Save
