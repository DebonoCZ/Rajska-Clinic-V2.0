import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { CmsProvider } from './context/CmsContext.jsx'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/pages.css'

/* VITE_ROUTER=hash slouží pro single-file build (sdílený náhled bez serveru). */
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CmsProvider>
        <App />
      </CmsProvider>
    </Router>
  </React.StrictMode>
)
