import React, { useState, createContext, useEffect, useContext, useCallback } from 'react'
import useLocalStorage from 'use-local-storage'
import { MarkdownDocument, MutableMarkdownDocument, MarkdownEditorData, DATE_FORMAT } from '../types/MarkdownTypes'
import data from '../data/data.json'
import dateFormat from 'dateformat'
import useLocalStorageState from 'use-local-storage-state'

const MarkdownContext = createContext<MarkdownEditorData>({
    documents: [],
    loadedDoc: { content: '', createdAt: new Date().toLocaleDateString(), name: '', id: -1 },
    setDocuments: () => {},
    setLoadedDoc: () => {},
    saveDocument: () => {},
    createNewDocument: (): MarkdownDocument => {
        return { createdAt: '', content: '', name: '', id: -1 }
    },
    updateDocumentName: () => {},
})

interface Props {
    children: React.ReactNode
}

const DEFAULT_DOC_NAME = 'untitled-document'
const ID_NOT_FOUND = -1

const createIndexedCollection = (array: MarkdownDocument[]): MarkdownDocument[] => {
    const newData: MarkdownDocument[] = []

    array.forEach((datum: MarkdownDocument, index: number) => {
        const newDatum: MarkdownDocument = {
            id: index,
            name: datum?.name || '',
            createdAt: datum?.createdAt || '',
            content: datum?.content || '',
        }
        newData.push(newDatum)
    })

    return newData
}

export const MarkdownProvider: React.FunctionComponent<Props> = ({ children }) => {
    // const [lsMarkdownDocuments, setLsMarkdownDocuments] = useLocalStorage<MarkdownDocument[]>(
    //     'markdown-documents',
    //     createIndexedCollection(data as MarkdownDocument[]),
    // )
    // const [lsLoadedDocument, setLsLoadedDocument] = useLocalStorage<MarkdownDocument>(
    //     'loaded-doc',
    //     lsMarkdownDocuments[0],
    // )
    const [lsMarkdownDocuments, setLsMarkdownDocuments] = useLocalStorageState<MarkdownDocument[]>(
        'markdown-documents',
        {
            defaultValue: createIndexedCollection(data as MarkdownDocument[]),
        },
    )
    const [lsLoadedDocument, setLsLoadedDocument] = useLocalStorageState<MarkdownDocument>('loaded-doc', {
        defaultValue: lsMarkdownDocuments[0],
    })

    // useEffect(() => {
    //     console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 55 ~ useEffect ~ lsLoadedDocument', lsLoadedDocument)
    // }, [lsLoadedDocument])

    // Under `useLocalStorage`, it's using `useState`, so this is redundant, however, using them due to TypeScript
    // complaining about `useLocalStorage` using its own local `Setter<T>` method instead of what `useState` returns
    const [markdownDocuments, setMarkdownDocuments] = useState<MarkdownDocument[]>(lsMarkdownDocuments)
    const [loadedDocument, setLoadedDocument] = useState<MarkdownDocument>(lsLoadedDocument)
    // const [markdownContent, setMarkdownContent] = useState<string>(lsMarkdownContent)

    useEffect(() => {
        setLsMarkdownDocuments(markdownDocuments)
        console.log(
            '🚀 ~ file: MarkdownDocumentContext.tsx ~ line 61 ~ useEffect ~ markdownDocuments',
            markdownDocuments,
        )
    }, [markdownDocuments])

    useEffect(() => {
        setLsLoadedDocument(loadedDocument)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 68 ~ useEffect ~ loadedDocument', loadedDocument)
    }, [loadedDocument])

    // useEffect(() => {
    //     console.log(`inside MDC, useEffect #3, markdownContent=${JSON.stringify(markdownContent)}`)
    //     setLsMarkdownContent(markdownContent)
    // }, [markdownContent])

    const createNewDocument = (): MarkdownDocument => {
        const count: number = markdownDocuments.filter((doc) => doc.name.startsWith(DEFAULT_DOC_NAME)).length
        const docSuffix: string = count > 0 ? `(${count})` : ''

        const nextId: number = markdownDocuments
            .map((doc) => doc.id)
            .reduce(function (a, b) {
                return Math.max(a, b)
            }, 0)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 85 ~ //useCallback ~ nextId', nextId)

        const newDoc: MarkdownDocument = {
            createdAt: dateFormat(new Date(), DATE_FORMAT as string),
            name: `${DEFAULT_DOC_NAME}${docSuffix}.md`,
            content: '',
            id: nextId,
        }
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 93 ~ //useCallback ~ newDoc', newDoc)

        return newDoc
    }

    const getDocIndexIfPresent = (docs: MarkdownDocument[], updatedDoc: MarkdownDocument): number => {
        // A 'doc's id should match its imdex in the collection, so try that first
        const id = updatedDoc.id
        if (docs[id].id === id) {
            return id
        }

        docs.forEach((doc, index) => {
            if (doc.id === id) {
                return index
            }
        })

        return ID_NOT_FOUND
    }

    const updateDocuments = (oldDoc: MarkdownDocument, updates: MutableMarkdownDocument) => {
        const updatedDoc: MarkdownDocument = Object.assign({}, oldDoc)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 120 ~ updateDocuments ~ oldDoc', oldDoc)

        if (updates.content) {
            updatedDoc.content = updates.content
            console.log(
                '🚀 ~ file: MarkdownDocumentContext.tsx ~ line 124 ~ updateDocuments ~ updates.content',
                updates.content,
            )
        }
        if (updates.name) {
            updatedDoc.name = updates.name
            console.log(
                '🚀 ~ file: MarkdownDocumentContext.tsx ~ line 128 ~ updateDocuments ~ updates.name',
                updates.name,
            )
        }

        const localDocs = [...markdownDocuments]
        const index = getDocIndexIfPresent(localDocs, updatedDoc)
        if (index === -1) {
            console.log(
                '🚀 ~ file: MarkdownDocumentContext.tsx ~ line 141 ~ updateDocuments ~ updatedDoc -- SAVING NEW DOCUMENT',
                updatedDoc,
            )
            setMarkdownDocuments([...localDocs, updatedDoc])
        } else {
            localDocs[index] = updatedDoc
            console.log(
                '🚀 ~ file: MarkdownDocumentContext.tsx ~ line 146 ~ updateDocuments ~ localDocs -- UPDATED DOCUMENTS ARRAY',
                localDocs,
            )
            setMarkdownDocuments([...localDocs])
        }
    }

    const updateDocumentName = (newDocumentName: string): void => {
        console.log(
            '🚀 ~ file: MarkdownDocumentContext.tsx ~ line 221 ~ updateDocumentName ~ newDocumentName',
            newDocumentName,
        )
        const localDoc = Object.assign({}, loadedDocument)
        localDoc.name = newDocumentName

        setLoadedDocument(localDoc)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 227 ~ updateDocumentName ~ localDoc', localDoc)
    }

    const saveDocument = (docToSave: MarkdownDocument): void => {
        if (!docToSave) return
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 164 ~ saveDocument ~ docToSave', docToSave)

        const localLoadedDoc = Object.assign({}, docToSave)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 182 ~ saveDocument ~ localLoadedDoc', localLoadedDoc)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 166 ~ saveDocument ~ docToSave', docToSave)
        setLoadedDocument(localLoadedDoc)
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 150 ~ saveDocument ~ loadedDocument', loadedDocument)

        updateDocuments(docToSave, { name: docToSave.name, content: docToSave.content })
        console.log('🚀 ~ file: MarkdownDocumentContext.tsx ~ line 188 ~ saveDocument ~ loadedDocument', loadedDocument)
    }

    const markdownContentEditorData = {
        documents: markdownDocuments,
        loadedDoc: loadedDocument,
        setDocuments: setMarkdownDocuments,
        setLoadedDoc: setLoadedDocument,
        saveDocument: saveDocument,
        createNewDocument: createNewDocument,
        updateDocumentName: updateDocumentName,
    }

    return <MarkdownContext.Provider value={markdownContentEditorData}>{children}</MarkdownContext.Provider>
}

export const useMarkdownContext = () => useContext(MarkdownContext)
