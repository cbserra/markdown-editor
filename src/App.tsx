import { useState } from 'react'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Sidebar from './components/sidebar/Sidebar'
import { MarkdownProvider } from './contexts/MarkdownDocumentContext'
import cx from 'classnames'

function App() {
    const [openNav, toggleOpenNav] = useState<boolean>(false)

    return (
        <MarkdownProvider>
            {/* <div className={'app bg-neutral-100 dark:bg-neutral-1000'}> */}
            <Sidebar openNav={openNav} toggleOpenNav={toggleOpenNav} />
            <div id="main-container" className={cx('h-full transition-spacing w-full', { 'ml-[250px]': openNav })}>
                <Header openNav={openNav} toggleOpenNav={toggleOpenNav} />
                <Main />
            </div>
            {/* </div> */}
        </MarkdownProvider>
    )
}

export default App
