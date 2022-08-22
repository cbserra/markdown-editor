import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { MarkdownProvider } from './contexts/MarkdownDocumentContext'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)
root.render(
    <React.StrictMode>
        <MarkdownProvider>
            <App />
        </MarkdownProvider>
    </React.StrictMode>,
)
