import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Leaves', href: '#catalog' },
  { label: 'Order', href: '#order' },
]

export default function Navbar({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-forest-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center group-hover:bg-leaf-500 transition-colors duration-300">
            <Leaf size={16} className="text-cream-50 rotate-45" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-forest-900 text-lg tracking-tight">YEHOVAH</div>
            <div className="font-body text-forest-600 text-[9px] uppercase tracking-widest -mt-1">Fresh Banana Leaf Supply</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link font-body font-medium text-forest-800 hover:text-forest-600 transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:6369582188"
            className="font-body text-xs text-forest-700 hover:text-forest-500 transition-colors"
          >
            +91 63695 82188
          </a>
          <a
            href="#order"
            className="bg-forest-800 hover:bg-forest-700 text-cream-50 font-body font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-forest-900/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            Request Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-forest-800 hover:bg-forest-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-forest-100/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body font-medium text-forest-800 hover:text-leaf-600 transition-colors py-1 border-b border-forest-100/60 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setMobileOpen(false)}
                className="bg-forest-800 text-cream-50 font-body font-medium text-sm px-5 py-3 rounded-full text-center mt-2"
              >
                Request Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
