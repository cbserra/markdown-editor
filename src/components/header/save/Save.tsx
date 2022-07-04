import { useContext } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'
import { MarkdownDocument } from '../../../types/MarkdownTypes'
import useAxios from 'axios-hooks'

const SaveButton = styled.button``
const Save = () => {
    const { markdownDocuments, setMarkdownDocuments, loadedDocument } = useContext(MarkdownContext)

    const [{ data, loading, error }, executeUpdate] = useAxios<MarkdownDocument>({}, { manual: true })

    const saveDocument = async (): Promise<void> => {
        if (!loadedDocument) return
        console.log('🚀 ~ file: Save.tsx ~ line 84 ~ saveDocument ~ loadedDocument', loadedDocument)

        const docToSave = Object.assign({}, loadedDocument)
        const id = docToSave.id
        console.log('🚀 ~ file: Save.tsx ~ line 88 ~ saveDocument ~ docToSave', docToSave)
        if (markdownDocuments.filter((doc) => doc.id === id).length > 0) {
            await executeUpdate({
                data: docToSave,
                url: `/${id}`,
                method: 'PUT',
            })
                .then((res) => {
                    console.log('🚀 ~ file: Save.tsx ~ line 125 ~ .then ~ res', res)
                    const docs = markdownDocuments.map((doc) => (doc.id === res.data?.id ? { ...res.data } : doc))
                    setMarkdownDocuments([...docs])
                })
                .catch(console.error)
        } else {
            // const response = await saveDoc(docToSave) //.catch(console.error)
            await executeUpdate({
                data: docToSave,
                url: `/`,
                method: 'POST',
            })
                .then((res) => {
                    console.log('🚀 ~ file: Save.tsx ~ line 138 ~ .then ~ res', res)
                    setMarkdownDocuments([...markdownDocuments, { ...res.data }])
                })
                .catch(console.error)
        }
    }

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
            <span className={`flex items-center justify-center ${loading ? 'fa-fade' : ''}`}>
                <SaveIcon />
                <span className="hidden md:inline pl-2 text-md">Save Changes</span>
            </span>
        </SaveButton>
    )
}

export default Save
