import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Hotel, UtensilsCrossed, CalendarDays, Package, ShoppingBag, Flame } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const clientTypes = [
  {
    icon: Hotel,
    title: 'Star Hotels & Restaurants',
    desc: 'Premium-grade leaves for daily service — consistent sizing, premium colour, and freshness that impresses discerning guests. Recurring weekly delivery contracts available.',
    tag: 'Daily Supply',
    tagColor: 'bg-leaf-100 text-leaf-800',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering Services',
    desc: 'Bulk orders fulfilled within 24–48 hours for planned events. Our catering-specific Tiffin and Lunch leaf bundles are pre-sorted for speed and efficiency in your kitchen.',
    tag: 'Bulk Orders',
    tagColor: 'bg-forest-100 text-forest-800',
  },
  {
    icon: CalendarDays,
    title: 'Wedding & Event Planners',
    desc: 'For traditional Tamil, Kerala, and Telugu weddings, we supply large-format Lunch Leaves in exact quantities needed — no surplus waste, no shortfall anxiety.',
    tag: 'Event Ready',
    tagColor: 'bg-bark-100 text-bark-700',
  },
  {
    icon: Package,
    title: 'Wholesalers & Distributors',
    desc: 'Partner with us for consistent farm-direct supply across your distribution network. Competitive wholesale pricing with guaranteed minimum quality standards per bundle.',
    tag: 'Wholesale',
    tagColor: 'bg-cream-200 text-bark-700',
  },
  {
    icon: ShoppingBag,
    title: 'Tiffin Centers & Fast Food',
    desc: 'Economical Tiffin Leaf packages optimized for daily breakfast service — idli, dosa, and parotta takeaway. Perfect-sized, hygienic, and budget-friendly.',
    tag: 'Daily Use',
    tagColor: 'bg-leaf-100 text-leaf-800',
  },
  {
    icon: Flame,
    title: 'Temples & Religious Institutions',
    desc: 'We hold a sacred responsibility in supplying leaves for temple prasadam and religious festival feasts. Pure, unadulterated, naturally clean leaves for divine offerings.',
    tag: 'Sacred Supply',
    tagColor: 'bg-cream-200 text-forest-800',
  },
]

export default function WhoWeServe() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-forest-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-leaf-600 font-body text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-leaf-400 inline-block" />
              Our Clients
              <span className="w-8 h-px bg-leaf-400 inline-block" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900 mb-5">Who We Serve</h2>
            <p className="font-body text-forest-600 text-base leading-relaxed">
              From temple kitchens to five-star hotel dining rooms, YEHOVAH leaves grace the most respected tables across Tamil Nadu.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clientTypes.map((client, i) => (
            <FadeIn key={client.title} delay={i * 0.08}>
              <div className="group bg-white rounded-2xl p-7 border border-forest-100 hover:border-forest-200 hover:shadow-xl hover:shadow-forest-900/5 transition-all duration-400 h-full relative overflow-hidden">
                {/* Subtle top-right decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-forest-50 to-transparent rounded-2xl" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 bg-forest-50 group-hover:bg-leaf-100 rounded-xl flex items-center justify-center transition-colors duration-300">
                      <client.icon size={20} className="text-forest-700" />
                    </div>
                    <span className={`text-[10px] font-body font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${client.tagColor}`}>
                      {client.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-forest-900 text-lg mb-3">{client.title}</h3>
                  <p className="font-body text-forest-600 text-sm leading-relaxed">{client.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA strip */}
        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <p className="font-body text-forest-600 text-sm mb-4">Don't see your category? We supply anyone who values freshness.</p>
            <a
              href="#order"
              className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-cream-50 font-body font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-forest-900/25 hover:-translate-y-0.5"
            >
              Discuss Your Requirements
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
