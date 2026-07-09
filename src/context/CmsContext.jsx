import { createContext, useContext, useState } from 'react'
import doctorsData from '../../data/doctors.json'
import servicesData from '../../data/services.json'
import pricelistData from '../../data/pricelist.json'
import siteData from '../../data/site.json'
import aboutData from '../../data/about.json'

/*
 * Simulace Webflow CMS: veškerý obsah žije v jednom stavu aplikace.
 * Každá stránka čte odsud — úprava v Demo CMS panelu se proto
 * okamžitě propíše všude (ceník, podstránky služeb, karty lékařů).
 */
const CmsContext = createContext(null)

export function CmsProvider({ children }) {
  const [doctors, setDoctors] = useState(doctorsData)
  const [services] = useState(servicesData)
  const [pricelist, setPricelist] = useState(pricelistData)

  const updateDoctorName = (doctorId, name) => {
    setDoctors((prev) => prev.map((d) => (d.id === doctorId ? { ...d, name } : d)))
  }

  const updateItemPrice = (categoryId, itemIndex, price) => {
    setPricelist((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map((item, i) => (i === itemIndex ? { ...item, price } : item)) }
          : cat
      ),
    }))
  }

  const value = {
    doctors,
    services,
    pricelist,
    site: siteData,
    about: aboutData,
    updateDoctorName,
    updateItemPrice,
  }

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms musí být použito uvnitř CmsProvider')
  return ctx
}
