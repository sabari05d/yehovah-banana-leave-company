import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Phone, Instagram } from 'lucide-react'

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 overflow-hidden"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-leaf-50 to-transparent rounded-3xl" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-forest-400 hover:text-forest-700 hover:bg-forest-50 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="relative z-10 text-center">
            {/* Success icon */}
            <motion.div
              className="w-20 h-20 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, duration: 0.7, bounce: 0.5 }}
            >
              <CheckCircle2 size={40} className="text-leaf-600" />
            </motion.div>

            {/* Animated checkmark ring */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-leaf-300"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            />

            <h3 className="font-display font-bold text-forest-900 text-2xl mb-3">Inquiry Received!</h3>
            <p className="font-body text-forest-600 text-sm leading-relaxed mb-2">
              Thank you for reaching out to <strong>YEHOVAH Fresh Banana Leaves</strong>. Your bulk inquiry has been submitted successfully.
            </p>
            <p className="font-body text-forest-500 text-sm leading-relaxed mb-8">
              Our team will review your requirements and respond with today's competitive pricing within a few hours. We look forward to serving you!
            </p>

            {/* Contact options */}
            <div className="space-y-3 mb-6">
              <div className="bg-forest-50 rounded-2xl p-4 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-body text-xs text-forest-500 uppercase tracking-wider">For urgent orders</div>
                  <div className="font-body font-semibold text-forest-800 text-sm">Call us directly</div>
                </div>
                <a href="tel:6369582188" className="flex items-center gap-2 bg-forest-800 text-white font-body font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-forest-700 transition-colors">
                  <Phone size={13} /> 63695 82188
                </a>
              </div>
              <a
                href="https://instagram.com/yehovah_banana_leaves"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-forest-200 rounded-2xl px-4 py-3 text-forest-600 hover:text-pink-600 hover:border-pink-200 transition-all font-body text-sm"
              >
                <Instagram size={15} />
                Follow us @yehovah_banana_leaves
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-leaf-600 hover:bg-leaf-700 text-white font-body font-semibold text-sm py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-leaf-900/20"
            >
              Close & Return to Site
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
