import { useState } from 'react'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Sidebar from './components/sidebar/Sidebar'
import { MarkdownProvider } from './contexts/MarkdownDocumentContext'
import cx from 'classnames'
import DeleteModal from './components/header/delete/DeleteModal'
import styled from 'styled-components'

const MainContainer = styled.div``
function App() {
    const [openNav, toggleOpenNav] = useState<boolean>(false)
    const [openDeleteModal, toggleOpenDeleteModal] = useState<boolean>(false)

    return (
        <MarkdownProvider>
            <Sidebar openNav={openNav} toggleOpenNav={toggleOpenNav} />
            <MainContainer id="main-container" className={cx('h-full w-full', { 'ml-[250px]': openNav })}>
                <DeleteModal openDeleteModal={openDeleteModal} toggleOpenDeleteModal={toggleOpenDeleteModal} />
                <Header
                    openNav={openNav}
                    toggleOpenNav={toggleOpenNav}
                    openDeleteModal={openDeleteModal}
                    toggleOpenDeleteModal={toggleOpenDeleteModal}
                />
                <Main />
            </MainContainer>
        </MarkdownProvider>
    )
}

export default App
