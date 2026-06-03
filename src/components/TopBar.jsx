import React from 'react'
import { motion } from 'framer-motion'

export default function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-forest-900 text-cream-200 text-center py-2 px-4 text-xs md:text-sm font-body tracking-wide"
    >
      <span className="font-accent italic text-leaf-300 text-sm md:text-base">
        &ldquo;The Lord your God is with you wherever you go.&rdquo;
      </span>
      <span className="text-forest-300 mx-2 hidden sm:inline">—</span>
      <span className="text-forest-400 font-body text-xs hidden sm:inline">Joshua 1:9</span>
    </motion.div>
  )
}
