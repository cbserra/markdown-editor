import { useContext } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'
import { MarkdownDocument } from '../../../types/MarkdownTypes'
import useAxios from 'axios-hooks'
import { toast, Toaster } from 'react-hot-toast'
import { AxiosError } from 'axios'

const SaveButton = styled.button``
const Save = () => {
    const { markdownDocuments, setMarkdownDocuments, loadedDocument } = useContext(MarkdownContext)

    const [{ loading }, executeUpdate] = useAxios<MarkdownDocument>({}, { manual: true })

    const saveDocument = async (): Promise<MarkdownDocument | undefined> => {
        if (!loadedDocument) return
        console.log('🚀 ~ file: Save.tsx ~ saveDocument ~ loadedDocument', loadedDocument)

        const docToSave = Object.assign({}, loadedDocument)
        const id = docToSave.id
        console.log('🚀 ~ file: Save.tsx ~ saveDocument ~ docToSave', docToSave)
        if (markdownDocuments.filter((doc) => doc.id === id).length) {
            const toastId = toast.loading('Updating Document...') // notify()
            await executeUpdate({
                data: docToSave,
                url: `/${id}`,
                method: 'PUT',
            })
                .then((res) => {
                    console.log('🚀 ~ file: Save.tsx ~ .then ~ res', res)
                    toast.success(`Updated ${res.data.name}!`, { id: toastId })
                    const docs = markdownDocuments.map((doc) => (doc.id === res.data?.id ? { ...res.data } : doc))
                    setMarkdownDocuments([...docs])

                    return res
                })
                .catch((err: AxiosError) => {
                    console.error('🚀 ~ file: Save.tsx ~ .catch ~ err', err)
                    toast.error(`Error updating ${docToSave.name}! ${err.name}: ${err.message}`, { id: toastId })
                })
        } else {
            const toastId = toast.loading('Saving New Document...') // notify()
            await executeUpdate({
                data: docToSave,
                url: `/`,
                method: 'POST',
            })
                .then((res) => {
                    toast.success(`Saved ${res.data.name}!`, { id: toastId })
                    console.log('🚀 ~ file: Save.tsx ~ .then ~ res', res)
                    setMarkdownDocuments([...markdownDocuments, { ...res.data }])

                    return res
                })
                .catch((err: AxiosError) => {
                    console.error('🚀 ~ file: Save.tsx ~ .catch ~ err', err)
                    toast.error(`Error saving ${docToSave.name}! ${err.name}: ${err.message}`, { id: toastId })
                })
        }
    }

    return (
        <>
            <SaveButton
                className={cx(
                    'flex items-center bg-orange-idle rounded w-10 md:w-[9.5rem] h-10 m-1 justify-center text-neutral-100 ',
                    'md:px-4 md:mx-2',
                    `${
                        loadedDocument.readOnly
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-orange-hover cursor-pointer'
                    }`,
                )}
                onClick={() => {
                    void saveDocument()
                }}
                disabled={loadedDocument.readOnly}
            >
                <span className={`flex items-center justify-center ${loading ? 'fa-fade' : ''}`}>
                    <SaveIcon />
                    <span className="hidden md:inline pl-2 text-md">Save Changes</span>
                </span>
            </SaveButton>
            <Toaster
                toastOptions={{
                    className: ' bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400',
                }}
                position="top-right"
                containerStyle={{
                    top: 75,
                    left: 0,
                    bottom: 0,
                    right: 8,
                }}
            />
        </>
    )
}

export default Save
