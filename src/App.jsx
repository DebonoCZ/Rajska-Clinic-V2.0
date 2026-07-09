import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CmsDemoPanel from './components/CmsDemoPanel.jsx'
import HomePage from './pages/HomePage.jsx'
import PricelistPage from './pages/PricelistPage.jsx'
import ServicePage from './pages/ServicePage.jsx'
import DoctorPage from './pages/DoctorPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cenik" element={<PricelistPage />} />
          <Route path="/sluzby/:slug" element={<ServicePage />} />
          <Route path="/tym/:slug" element={<DoctorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CmsDemoPanel />
    </>
  )
}
