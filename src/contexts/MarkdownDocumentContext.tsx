import React, { useState, createContext } from 'react'
import { MarkdownDocument, MarkdownEditorData, DATE_FORMAT } from '../types/MarkdownTypes'
import dateFormat from 'dateformat'
import useAxios, { configure } from 'axios-hooks'
import Axios from 'axios'

const API_ENDPOINT = (process.env.REACT_APP_API_HOST ?? 'http://localhost:3005/') + '/docs'
const DEFAULT_DOC_NAME = 'untitled-document'
const EMPTY_OBJ = { content: '', createdAt: new Date().toLocaleDateString(), name: '', id: -1, readOnly: false }

const axios = Axios.create({
    baseURL: API_ENDPOINT,
})

configure({ axios })

const MarkdownContext = createContext<MarkdownEditorData>({
    markdownDocuments: [],
    loadedDocument: EMPTY_OBJ,
    setMarkdownDocuments: () => {},
    setLoadedDocument: () => {},
    createNewDocument: (): MarkdownDocument => EMPTY_OBJ,
    loading: false,
    error: null,
    axios: axios,
})

interface Props {
    children: React.ReactNode
}

export const MarkdownProvider: React.FunctionComponent<Props> = ({ children }) => {
    const [{ data, loading, error }, refetch] = useAxios<MarkdownDocument[]>({
        url: '/',
        method: 'GET',
    })

    const [markdownDocuments, setMarkdownDocuments] = useState<MarkdownDocument[]>(data?.slice() ?? [])
    const [loadedDocument, setLoadedDocument] = useState<MarkdownDocument>(
        markdownDocuments[0] ?? { content: '', createdAt: '', name: '', id: -1, readOnly: false },
    )

    // const [{ data: putData, loading: putLoading, error: putError }, executePut] = useAxios<MarkdownDocument>(
    //     {
    //         url: `/${loadedDocument.id}`,
    //         method: 'PUT',
    //     },
    //     { manual: true },
    // )

    // const [{ data: postData, loading: postLoading, error: postError }, executePost] = useAxios<MarkdownDocument>(
    //     {
    //         url: `/${loadedDocument.id}`,
    //         method: 'POST',
    //     },
    //     { manual: true },
    // )

    // const [{ data: deleteData, loading: deleteLoading, error: deleteError }, executeDelete] =
    //     useAxios<MarkdownDocument>(
    //         {
    //             url: `/${loadedDocument.id}`,
    //             method: 'DELETE',
    //         },
    //         { manual: true },
    //     )

    // const fetchData = async () => {
    //     const resp = await axios.get<MarkdownDocument[]>(API_ENDPOINT)
    //     const mdData: MarkdownDocument[] = resp.data
    //     setMarkdownDocuments(mdData)
    //     setLoadedDocument(mdData[0])
    // }

    // useEffect(() => {
    //     fetchData().catch(console.error)
    // }, [])
    // const [markdownContent, setMarkdownContent] = useState<string>(lsMarkdownContent)

    const createNewDocument = (): MarkdownDocument => {
        console.log(
            '🚀 ~ file: MarkdownProvider.tsx ~ line 12 ~ createNewDocument ~ markdownDocuments',
            markdownDocuments,
        )
        const count: number = markdownDocuments.filter((doc) => doc.name.startsWith(DEFAULT_DOC_NAME)).length
        const docSuffix: string = count > 0 ? `(${count})` : ''

        const nextId: number =
            markdownDocuments
                .map((doc) => doc.id)
                .reduce(function (a, b) {
                    return Math.max(a, b)
                }, 0) + 1
        console.log('🚀 ~ file: MarkdownProvider.tsx ~ line 85 ~ nextId', nextId)

        const newDoc: MarkdownDocument = {
            createdAt: dateFormat(new Date(), DATE_FORMAT as string),
            name: `${DEFAULT_DOC_NAME}${docSuffix}.md`,
            content: '',
            id: nextId,
            readOnly: false,
        }
        console.log('🚀 ~ file: MarkdownProvider.tsx ~ line 93 ~ newDoc', newDoc)

        return newDoc
    }

    return (
        <MarkdownContext.Provider
            value={{
                markdownDocuments,
                loadedDocument,
                setMarkdownDocuments,
                setLoadedDocument,
                createNewDocument,
                loading,
                error,
                axios,
            }}
        >
            {children}
        </MarkdownContext.Provider>
    )
}

// export const useMarkdownContext = () => useContext(MarkdownContext)
export default MarkdownContext
