export type MarkdownEditorData = {
    documents: MarkdownDocument[]
    loadedDoc: MarkdownDocument
    // markdownContent: string
    setDocuments: React.Dispatch<React.SetStateAction<MarkdownDocument[]>>
    setLoadedDoc: React.Dispatch<React.SetStateAction<MarkdownDocument>>
    // setMarkdownContent: React.Dispatch<React.SetStateAction<string>>
    saveDocument: (docToSave: MarkdownDocument) => void
    createNewDocument: () => MarkdownDocument
    updateDocumentName: (newDocumentName: string) => void
}

export interface MarkdownDocument {
    readonly id: number
    readonly createdAt: string
    name: string
    content: string
}

export const markdownDocKeys: (keyof MarkdownDocument)[] = ['id', 'createdAt', 'name', 'content']

export type OptionalMarkdownDocument = Partial<MarkdownDocument>

// export const optionalMarkdownDocKeys: (keyof OptionalMarkdownDocument)[] = ['id ', 'createdAt', 'name', 'content']

export interface MutableMarkdownDocument
    extends Omit<OptionalMarkdownDocument, 'id' | 'createdAt'>,
        Partial<Pick<OptionalMarkdownDocument, 'id' | 'createdAt'>> {}

export const mutableMarkdownDocKeys: (keyof MutableMarkdownDocument)[] = ['name', 'content']

export const DATE_FORMAT = 'dd mmmm yyyy'
