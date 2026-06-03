import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Droplets, Sun, Mountain, Truck, Leaf, Award } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: Mountain,
    title: 'Western Ghats Heritage',
    desc: 'Our farms nestle in the fertile foothills of the Western Ghats, where generations of natural composting has created exceptionally nutrient-rich, red laterite soil — the secret behind leaves that are stronger, greener, and more aromatic than lowland varieties.',
  },
  {
    icon: Droplets,
    title: 'Pristine Water Sources',
    desc: 'Fed by the seasonal streams and springs descending from the Sathyamangalam Tiger Reserve, our plantations receive clean, mineral-rich irrigation that enhances the natural waxy lustre and structural integrity of every leaf.',
  },
  {
    icon: Sun,
    title: 'Dawn-to-Door Harvesting',
    desc: 'Leaves are cut between 4–7 AM at peak cellular hydration, packed immediately, and dispatched before sunrise. By the time your kitchen opens, you receive leaves that are mere hours old — not days.',
  },
  {
    icon: Truck,
    title: 'Zero Cold-Chain, All-Natural',
    desc: 'Our leaves need no refrigeration or chemical treatment. Their natural freshness holds for 2–3 days at room temperature. This is the mark of truly premium quality — nature\'s own preservation.',
  },
  {
    icon: Leaf,
    title: 'Varietal Expertise',
    desc: 'We grow and supply three distinct cultivars: the standard Nenthra-type for everyday use, the broad Poovan for banquets, and the rare Chevvazhai (Red Banana) with its striking burgundy midrib prized for ceremonial serving.',
  },
  {
    icon: Award,
    title: 'Traditional Quality Standards',
    desc: 'Every bundle is hand-inspected for size uniformity, colour consistency, and absence of blemishes. We reject up to 20% of each harvest to maintain the premium grade our clients expect.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-forest-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <FadeIn>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-leaf-600 font-body text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-leaf-400 inline-block" />
              Our Origin Story
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900 leading-tight mb-6">
              Why Sathyamangalam?{' '}
              <em className="font-accent italic font-normal text-leaf-600">The Difference is in the Land.</em>
            </h2>
            <p className="font-body text-forest-600 text-lg leading-relaxed">
              Tucked between the Nilgiris and the Erode plains, Sathyamangalam has been a whispered secret among the finest caterers of Tamil Nadu for decades. The town's unique microclimate, ancient volcanic soils, and pristine forest-fed waterways conspire to produce banana leaves of unparalleled quality.
            </p>
          </div>
        </FadeIn>

        {/* Features bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <div className="group p-7 rounded-2xl border border-forest-100 hover:border-forest-200 hover:bg-forest-50/50 transition-all duration-400 h-full cursor-default">
                <div className="w-10 h-10 bg-forest-100 group-hover:bg-leaf-200 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <f.icon size={20} className="text-forest-700 group-hover:text-forest-800 transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-forest-900 text-lg mb-3">{f.title}</h3>
                <p className="font-body text-forest-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quote banner */}
        <FadeIn delay={0.3}>
          <div className="mt-16 bg-forest-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 leaf-texture opacity-20" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-accent italic text-leaf-300 text-4xl leading-none mb-4">"</div>
                <blockquote className="font-accent text-xl md:text-2xl italic text-cream-100 leading-relaxed font-light">
                  We don't just supply leaves. We deliver a piece of Tamil Nadu's culinary heritage — the same tradition that has graced temple feasts and royal banquets for centuries.
                </blockquote>
                <div className="mt-6 font-body text-forest-400 text-sm">
                  — The Founding Family, YEHOVAH Farms, Sathyamangalam
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '6 AM', label: 'Harvest Time', sub: 'Cut fresh daily' },
                  { num: '100%', label: 'Organic', sub: 'No chemicals' },
                  { num: '3 Days', label: 'Shelf Life', sub: 'Room temperature' },
                  { num: 'All TN', label: 'Delivery', sub: 'Pan Tamil Nadu' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="font-display font-bold text-leaf-300 text-2xl">{s.num}</div>
                    <div className="font-body font-semibold text-cream-100 text-xs uppercase tracking-wider mt-1">{s.label}</div>
                    <div className="font-body text-forest-400 text-xs mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
