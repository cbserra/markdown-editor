import { useContext } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { ReactComponent as SaveIcon } from '../../../images/icon-save.svg'
import { MarkdownDocument } from '../../../types/MarkdownTypes'
import useAxios from 'axios-hooks'
import Overlay from '../../overlay/Overlay'
import { AxiosError } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { textSpanOverlapsWith } from 'typescript'

const SaveButton = styled.button``
const Save = () => {
    const { markdownDocuments, setMarkdownDocuments, loadedDocument, setLoading, setError } =
        useContext(MarkdownContext)

    const [{ data, loading, error }, executeUpdate] = useAxios<MarkdownDocument>({}, { manual: true })

    const saveDocument = async (): Promise<MarkdownDocument | undefined> => {
        if (!loadedDocument) return
        console.log('🚀 ~ file: Save.tsx ~ line 84 ~ saveDocument ~ loadedDocument', loadedDocument)

        const docToSave = Object.assign({}, loadedDocument)
        const id = docToSave.id
        console.log('🚀 ~ file: Save.tsx ~ line 88 ~ saveDocument ~ docToSave', docToSave)
        if (markdownDocuments.filter((doc) => doc.id === id).length > 0) {
            const toastId = toast.loading('Updating Document...') // notify()
            await executeUpdate({
                data: docToSave,
                url: `/${id}`,
                method: 'PUT',
            }).then((res) => {
                console.log('🚀 ~ file: Save.tsx ~ line 125 ~ .then ~ res', res)
                toast.success(`Saved ${res.data.name}!`, { id: toastId })
                const docs = markdownDocuments.map((doc) => (doc.id === res.data?.id ? { ...res.data } : doc))
                setMarkdownDocuments([...docs])

                return res
            })

            if (error) {
                toast.error(`Error saving ${docToSave.name}!`, { id: toastId })
            }
            // .catch((err: AxiosError<any, any>) => {
            //     console.error('🚀 ~ file: Save.tsx ~ line 35 ~ .catch ~ err', err)
            //     setError(err)
            // })
        } else {
            const toastId = toast.loading('Saving New Document...') // notify()
            // const response = await saveDoc(docToSave) //.catch(console.error)
            await executeUpdate({
                data: docToSave,
                url: `/`,
                method: 'POST',
            }).then((res) => {
                toast.success(`Saved ${res.data.name}!`, { id: toastId })
                console.log('🚀 ~ file: Save.tsx ~ line 138 ~ .then ~ res', res)
                setMarkdownDocuments([...markdownDocuments, { ...res.data }])

                return res
            })

            if (error) {
                toast.error(`Error saving ${docToSave.name}!`, { id: toastId })
            }
            // .catch((err: AxiosError<any, any>) => {
            //     console.error('🚀 ~ file: Save.tsx ~ line 35 ~ .catch ~ err', err)
            //     setError(err)
            // })
        }
    }

    // if (error) {
    //     return (
    //         <Overlay showOrHide={true}>
    //             <div>{error?.message}</div>
    //         </Overlay>
    //     )
    // }

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
                // ref={saveDocRef}

                onClick={() => {
                    // const executeSave = async () => {
                    //     await saveDocument()
                    //         .then((res: MarkdownDocument | undefined) => {
                    //             if (res) {
                    //                 console.log('🚀 ~ file: Save.tsx ~ line 89 ~ .then ~ res', res)
                    //                 // toast.success(`Saved ${res.name}!`, { id: toastId })
                    //             } else {
                    //                 console.log('🚀 ~ file: Save.tsx ~ line 89 ~ .then ~ else')
                    //                 // toast.dismiss(toastId)
                    //             }
                    //         })
                    //         .catch((err: AxiosError) => {
                    //             console.log('🚀 ~ file: Save.tsx ~ line 93 ~ Save ~ err', err)
                    //             // toast.error(`An error occurred: ${err.message}`, { id: toastId })
                    //         })

                    //     // const saveFunction = toast.promise(saveDocument(), {
                    //     //     loading: 'Saving...',
                    //     //     success: (savedData: MarkdownDocument | undefined) =>
                    //     //         `Successfully saved ${savedData ? savedData.name : 'document'}`,
                    //     //     error: (err: string) => `This just happened: ${err.toString()}`,
                    //     // })
                    // }
                    // void executeSave()
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
