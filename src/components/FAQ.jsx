import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const faqs = [
  {
    q: 'How long do banana leaves stay fresh after delivery?',
    a: 'Our leaves stay fresh for 2–3 days at room temperature in a cool, dry space, and up to 5–6 days when wrapped in damp newspaper and stored in a refrigerator at 8–12°C. Avoid direct sunlight or sealed plastic bags, which trap moisture and accelerate yellowing. For best results, use within 24 hours of delivery for premium events.',
    category: 'Storage & Freshness',
  },
  {
    q: 'What is the shelf life of banana leaves, and how should I store them?',
    a: 'Unwrapped at room temperature: 2–3 days. Wrapped in damp newsprint in a cool area: 3–4 days. Refrigerated (lightly wrapped, not sealed): up to 6 days. Do not freeze — freezing ruptures the cells and makes the leaves limp and unusable. Stack leaves flat, not rolled tightly, to prevent creasing along the lamina.',
    category: 'Storage & Freshness',
  },
  {
    q: 'Do you deliver outside Erode district — to Chennai, Coimbatore, or other cities?',
    a: 'Yes! We deliver across Tamil Nadu including Chennai, Coimbatore, Salem, Madurai, Trichy, Tiruppur, and surrounding districts. For locations beyond Erode district, we partner with reliable logistics partners for same-day or next-morning delivery depending on your city. Minimum order quantities apply for outstation deliveries. Contact us to confirm availability for your area.',
    category: 'Delivery & Logistics',
  },
  {
    q: 'How does daily pricing work? Why does the price change every day?',
    a: 'Banana leaf pricing is determined by the local Sathyamangalam agricultural market (mandi) rate, which fluctuates based on seasonal supply, weather conditions, and festival demand. For example, prices typically rise 30–60% during Pongal, Tamil New Year, Karthigai Deepam, and peak wedding season (Nov–Feb and May–July). We transparently share the exact daily mandi rate with each inquiry — there are no hidden markups. This is standard practice for all fresh agricultural produce.',
    category: 'Pricing',
  },
  {
    q: 'What is the minimum order quantity for bulk pricing?',
    a: 'Our standard retail bundles start from 100 pieces. For bulk/wholesale pricing, minimum orders are typically 1,000 pieces (10 bundles) for Tiffin Leaves and 500 pieces (5 bundles) for Lunch Leaves. For recurring weekly contracts, we\'re flexible on minimum quantities based on your average usage. Specialty varieties like Chevvazhai may have higher minimums due to limited availability.',
    category: 'Ordering',
  },
  {
    q: 'Are the leaves cleaned and hygienic? What about quality control?',
    a: 'Yes — all our leaves are field-cleaned with fresh water immediately after cutting. We perform a two-stage quality inspection: first by our harvest team in the field (removing damaged, yellowed, or undersized leaves), and second at our packing facility. We reject approximately 15–20% of each harvest batch to ensure only premium-grade leaves are packed. No chemical washes, preservatives, or artificial treatments are used.',
    category: 'Quality',
  },
  {
    q: 'Can I get a recurring weekly supply contract?',
    a: 'Absolutely. We specialize in stable weekly and bi-weekly supply contracts for hotels, restaurant chains, and catering companies. Recurring clients receive priority fulfillment (your order is prepared first each morning), locked-in rate agreements for periods of 4–8 weeks, and a dedicated WhatsApp order channel for easy repeat ordering. Contact us to set up a supply arrangement.',
    category: 'Ordering',
  },
  {
    q: 'What is the difference between Tiffin Leaves and Lunch Leaves?',
    a: 'Tiffin Leaves are cut to approximately 18" × 12" — ideal for individual snack platings, takeaway packaging, and breakfast service. Lunch Leaves are the full-size traditional meal leaf (24" × 16" or larger) suitable for a complete sadhu meal with rice, multiple curries, and side dishes. Lunch leaves are thicker and stronger to handle liquid-based dishes without tearing.',
    category: 'Products',
  },
  {
    q: 'What makes Chevvazhai (Red Banana) leaves special?',
    a: 'Chevvazhai leaves come from the Red Banana cultivar and are characterised by a striking burgundy-red midrib, deeper green lamina, and a slightly thicker, more aromatic leaf surface. They are traditionally prized for temple offerings, high-end event plating, and Ayurvedic cooking (the slight earthiness of the leaf is believed to enhance certain traditional preparations). Due to the limited cultivation area of red banana varieties, Chevvazhai leaves are available seasonally and in smaller quantities.',
    category: 'Products',
  },
]

const categories = ['All', ...new Set(faqs.map(f => f.category))]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory)

  return (
    <section className="py-20 md:py-28 bg-forest-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-leaf-600 font-body text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-leaf-400 inline-block" />
              Common Questions
              <span className="w-8 h-px bg-leaf-400 inline-block" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900 mb-4">Frequently Asked Questions</h2>
            <p className="font-body text-forest-600 text-base">Everything you need to know about our leaves, delivery, and pricing.</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpen(null) }}
                className={`font-body text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-forest-800 border-forest-800 text-white'
                    : 'bg-white border-forest-200 text-forest-600 hover:border-forest-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.05}>
              <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${open === i ? 'border-forest-200 shadow-md' : 'border-forest-100 hover:border-forest-200'}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-body font-bold uppercase tracking-wider text-leaf-600 bg-leaf-50 px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0 hidden sm:block">
                      {faq.category}
                    </span>
                    <span className="font-display font-semibold text-forest-900 text-base leading-snug">{faq.q}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-7 h-7 bg-forest-100 rounded-full flex items-center justify-center"
                  >
                    <ChevronDown size={14} className="text-forest-700" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="pl-0 sm:pl-[calc(theme(spacing.2)+2rem+theme(spacing.3))]">
                          <p className="font-body text-forest-700 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 text-center bg-white rounded-2xl border border-forest-100 p-8">
            <p className="font-display font-semibold text-forest-900 text-lg mb-2">Still have questions?</p>
            <p className="font-body text-forest-600 text-sm mb-5">Our team is available 7 AM – 8 PM daily.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="tel:6369582188" className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-cream-50 font-body font-semibold text-sm px-6 py-3 rounded-full transition-all hover:-translate-y-0.5">
                📞 Call Us Now
              </a>
              <a href="mailto:yehovahbananaleaves@gmail.com" className="inline-flex items-center gap-2 border-2 border-forest-700 text-forest-800 font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-forest-50 transition-all hover:-translate-y-0.5">
                ✉ Email Us
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
