import React, { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import WhoWeServe from './components/WhoWeServe'
import ProductCatalog from './components/ProductCatalog'
import OrderForm from './components/OrderForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import SuccessModal from './components/SuccessModal'

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBar />
      <Navbar scrolled={navScrolled} />
      <main>
        <Hero />
        <AboutSection />
        <WhoWeServe />
        <ProductCatalog />
        <OrderForm onSuccess={() => setShowSuccess(true)} />
        <FAQ />
      </main>
      <Footer />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  )
}
