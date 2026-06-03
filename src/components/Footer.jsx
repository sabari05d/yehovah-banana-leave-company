import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Leaf, Clock, ExternalLink } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Leaves', href: '#catalog' },
  { label: 'Bulk Inquiry', href: '#order' },
  { label: 'FAQ', href: '#faq' },
]

const products = [
  'Tiffin Leaves (Standard)',
  'Tiffin Leaves (Premium)',
  'Lunch Leaves (Premium)',
  'Red Banana / Chevvazhai Leaves',
  'Nenthra Variety Leaves',
  'Poovan Variety Leaves',
]

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-300">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-leaf-600 rounded-full flex items-center justify-center">
                <Leaf size={18} className="text-white rotate-45" />
              </div>
              <div>
                <div className="font-display font-bold text-cream-50 text-xl">YEHOVAH</div>
                <div className="font-body text-forest-400 text-[9px] uppercase tracking-widest">Fresh Banana Leaf Supply</div>
              </div>
            </div>
            <p className="font-accent italic text-leaf-400 text-lg font-light mb-4 leading-snug">
              Pure Leaves. Pure Tradition.
            </p>
            <p className="font-body text-forest-400 text-sm leading-relaxed mb-6">
              Direct-from-farm banana leaves from the Western Ghats foothills of Sathyamangalam, Erode. Supplying tradition to your table since our founding.
            </p>

            {/* Social */}
            <a
              href="https://instagram.com/yehovah_banana_leaves"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-forest-400 hover:text-pink-400 transition-colors text-sm font-body"
            >
              <Instagram size={16} />
              @yehovah_banana_leaves
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-cream-100 text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-forest-400 hover:text-leaf-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-forest-600 group-hover:bg-leaf-500 group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-body font-semibold text-cream-100 text-sm uppercase tracking-widest mb-5">Our Products</h4>
            <ul className="space-y-2.5">
              {products.map(p => (
                <li key={p}>
                  <a href="#catalog" className="font-body text-forest-400 hover:text-leaf-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-forest-600 group-hover:bg-leaf-500 group-hover:w-4 transition-all duration-200" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-cream-100 text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-leaf-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-body text-forest-300 text-sm leading-relaxed">
                    Sathyamangalam,<br />
                    Erode District – 638401<br />
                    Tamil Nadu, India
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-leaf-500 flex-shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:6369582188" className="font-body text-forest-300 hover:text-leaf-400 text-sm transition-colors block">+91 63695 82188</a>
                  <a href="tel:7339104407" className="font-body text-forest-300 hover:text-leaf-400 text-sm transition-colors block">+91 73391 04407</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-leaf-500 flex-shrink-0" />
                <a href="mailto:yehovahbananaleaves@gmail.com" className="font-body text-forest-300 hover:text-leaf-400 text-sm transition-colors break-all">
                  yehovahbananaleaves@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-leaf-500 flex-shrink-0" />
                <div>
                  <div className="font-body text-forest-300 text-sm">Available 7 AM – 8 PM</div>
                  <div className="font-body text-forest-500 text-xs">All days including weekends</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bible verse banner */}
      <div className="border-t border-forest-800/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-accent italic text-leaf-500 text-base font-light text-center md:text-left">
            "The Lord your God is with you wherever you go." — Joshua 1:9
          </p>
          <p className="font-body text-forest-500 text-xs text-center md:text-right">
            © {new Date().getFullYear()} YEHOVAH Fresh Banana Leaf Trading, Farming and Supply.<br className="sm:hidden" />
            {' '}All rights reserved. Sathyamangalam, Erode, Tamil Nadu.
          </p>
        </div>
      </div>
    </footer>
  )
}
