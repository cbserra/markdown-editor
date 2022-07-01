import dateFormat from 'dateformat'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import MarkdownContext from '../../../contexts/MarkdownDocumentContext'
import { MarkdownDocument, DATE_FORMAT } from '../../../types/MarkdownTypes'
import { ReactComponent as DocIcon } from '../../../images/icon-document.svg'
import cx from 'classnames'

const Document = styled.div``
const FileInfo = styled.div``
const FileCreationDate = styled.span``

const Filename = styled.span``

export default function DocListing() {
    const { markdownDocuments, setLoadedDocument, loadedDocument } = useContext(MarkdownContext)
    const [localMarkdownDocuments, setLocalMarkdownDocuments] = useState<MarkdownDocument[]>(markdownDocuments)

    useEffect(() => {
        setLocalMarkdownDocuments(markdownDocuments)
    }, [markdownDocuments])

    const docListings = localMarkdownDocuments.map((doc: MarkdownDocument, index: number) => {
        return (
            <Document key={index} className="flex items-center justify-start w-full m-2">
                <DocIcon title="document" />
                <FileInfo className={'file-info justify-end flex flex-col ml-4 mb-0'}>
                    <FileCreationDate className={'date font-sans text-[13px]'}>
                        {dateFormat(new Date(doc.createdAt), DATE_FORMAT)}
                    </FileCreationDate>
                    <Filename
                        className={cx(
                            'filename font-sans text-[15px] font-normal leading-[18px] hover:text-orange-idle',
                            loadedDocument.id === doc.id ? 'text-orange-hover' : undefined,
                        )}
                        role={'button'}
                        onClick={() => setLoadedDocument(doc)}
                    >
                        {doc.name}
                    </Filename>
                </FileInfo>
            </Document>
        )
    })

    return <>{docListings}</>
}
