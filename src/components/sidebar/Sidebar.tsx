import { ReactComponent as Logo } from '../../images/logo.svg'
import { ReactComponent as DocIcon } from '../../images/icon-document.svg'
import { useEffect, useRef } from 'react'
import dateFormat from 'dateformat'
import ToggleMode from './toggle-mode/ToggleMode'
import styled from 'styled-components'
import { useMarkdownContext } from '../../contexts/MarkdownDocumentContext'
import cx from 'classnames'
import { DATE_FORMAT, MarkdownDocument } from '../../types/MarkdownTypes'

const SidebarDiv = styled.div``
const MyDocuments = styled.div``
const NewDocument = styled.button``

const Document = styled.div``
const FileInfo = styled.div``
const FileCreationDate = styled.span``

const Filename = styled.span``

const Sidebar = (props: { openNav: boolean; toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { documents, setLoadedDoc, createNewDocument } = useMarkdownContext()

    const newDocumentRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        const createAndSetNewDocument = (): void => {
            const newDoc: MarkdownDocument = createNewDocument()
            setLoadedDoc(newDoc)
            console.log('🚀 ~ file: Sidebar.tsx ~ line 60 ~ createAndSetNewDocument ~ newDoc', newDoc)
        }
        const element = newDocumentRef.current
        element?.addEventListener('click', createAndSetNewDocument)
        console.log('🚀 ~ file: Sidebar.tsx ~ line 65 ~ useEffect ~ element', element)

        return () => {
            element?.removeEventListener('click', createAndSetNewDocument)
        }
    }, [])

    const docListing = (): JSX.Element[] => {
        return documents.map((doc: MarkdownDocument, index: number) => {
            return (
                <Document key={index} className="flex items-center justify-start w-full m-2">
                    <DocIcon title="document" />
                    <FileInfo className={'file-info justify-end flex flex-col ml-4 mb-0'}>
                        <FileCreationDate className={'date font-sans text-[13px]'}>
                            {dateFormat(new Date(doc.createdAt), DATE_FORMAT)}
                        </FileCreationDate>
                        <Filename
                            className={
                                'filename font-sans text-[15px] font-normal leading-[18px] hover:text-orange-idle'
                            }
                            role={'button'}
                            onClick={() => setLoadedDoc(doc)}
                        >
                            {doc.name}
                        </Filename>
                    </FileInfo>
                </Document>
            )
        })
    }

    return (
        <SidebarDiv
            className={cx(
                'sidebar bg-neutral-1000 text-neutral-100 items-start flex flex-col min-h-full justify-start px-6 py-7 fixed -left-[250px] w-[250px] z-0',
                { ['open left-0 ']: props.openNav },
            )}
            id="sidenav"
        >
            <Logo title="logo" className="lg:hidden mb-7" />

            <MyDocuments
                className={
                    'my-documents text-neutral-500 font-sans text-sm leading-4 tracking-[.125rem] uppercase mb-7'
                }
            >
                My Documents
            </MyDocuments>

            <NewDocument
                className={
                    'new-document mb-6 bg-orange-idle hover:bg-orange-hover rounded-[4px] text-neutral-100 font-sans text-[15px] leading-[18px] font-normal px-8 py-3 text-center min-w-full'
                }
                ref={newDocumentRef}
            >
                + New Document
            </NewDocument>
            {documents && docListing()}

            <ToggleMode />
        </SidebarDiv>
    )
}

export default Sidebar
