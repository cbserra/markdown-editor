import { Axios, AxiosError } from 'axios'

export type MarkdownEditorData = {
    markdownDocuments: MarkdownDocument[]
    loadedDocument: MarkdownDocument
    // markdownContent: string
    setMarkdownDocuments: React.Dispatch<React.SetStateAction<MarkdownDocument[]>>
    setLoadedDocument: React.Dispatch<React.SetStateAction<MarkdownDocument>>
    // setMarkdownContent: React.Dispatch<React.SetStateAction<string>>
    // saveDocument: () => void
    // createNewDocument: () => MarkdownDocument
    // updateDocumentName: (newDocumentName: string) => void
    createNewDocument: () => MarkdownDocument
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    error: AxiosError | null
    setError: React.Dispatch<React.SetStateAction<AxiosError<any, any> | null>>
    axios: Axios
}

export interface MarkdownDocument {
    readonly id: number
    readonly createdAt: string
    name: string
    content: string
    readonly readOnly?: boolean
}

export const markdownDocKeys: (keyof MarkdownDocument)[] = ['id', 'createdAt', 'name', 'content']

export type OptionalMarkdownDocument = Partial<MarkdownDocument>

// export const optionalMarkdownDocKeys: (keyof OptionalMarkdownDocument)[] = ['id ', 'createdAt', 'name', 'content']

export interface MutableMarkdownDocument
    extends Omit<OptionalMarkdownDocument, 'id' | 'createdAt' | 'readOnly'>,
        Partial<Pick<OptionalMarkdownDocument, 'id' | 'createdAt' | 'readOnly'>> {}

export const mutableMarkdownDocKeys: (keyof MutableMarkdownDocument)[] = ['name', 'content']

export const DATE_FORMAT = 'dd mmmm yyyy'
