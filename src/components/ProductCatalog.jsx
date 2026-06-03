import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertCircle, Star, ChevronRight, Leaf } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const mainCategories = [
  {
    id: 'tiffin',
    name: 'Tiffin Leaves',
    tamil: 'டிபன் இலை',
    grade: 'Standard & Premium',
    size: '18" × 12" avg.',
    use: 'Breakfast, Snacks, Fast Food',
    desc: 'Smaller, precisely cut leaves optimized for tiffin service — idli, dosa, parotta, and snack plating. Uniform sizing ensures consistent presentation across high-volume kitchens. Bundled in counts of 100 for efficient service.',
    benefits: ['Uniform 18" × 12" cut', 'Moisture-retentive surface', '100-piece bundles', 'Ideal for takeaway'],
    badge: 'Best Seller',
    badgeColor: 'bg-leaf-500 text-white',
    bg: 'from-leaf-50 to-forest-50',
    border: 'border-leaf-200 hover:border-leaf-400',
    leafEmoji: '🍃',
  },
  {
    id: 'lunch',
    name: 'Lunch Leaves',
    tamil: 'சாப்பாட்டு இலை',
    grade: 'Premium Only',
    size: '24" × 16" avg.',
    use: 'Weddings, Banquets, Fine Dining',
    desc: 'Full-size traditional lunch leaves in premium grade — large format, thick, and structurally sound enough to hold a complete Tamil sadhu meal without tearing. The gold standard for weddings, temple feasts, and Chettinad banquets.',
    benefits: ['Full 24" × 16" size', 'Tear-resistant grade', 'Wedding-grade quality', 'Ceremonially clean'],
    badge: 'Premium Grade',
    badgeColor: 'bg-forest-800 text-cream-100',
    bg: 'from-forest-50 to-cream-100',
    border: 'border-forest-200 hover:border-forest-400',
    leafEmoji: '🌿',
  },
]

const specialtyVarieties = [
  {
    name: 'Chevvazhai (Red Banana) Leaves',
    tamil: 'செவ்வாழை இலை',
    desc: 'A rare and culturally significant variety with a distinctive burgundy-red midrib and deep green lamina. Thicker and more aromatic than standard varieties, Chevvazhai leaves are prized for Ayurvedic cooking vessels, ritual prasadam presentation, and high-end restaurant plating. Limited seasonal availability.',
    note: 'Seasonal & Limited',
    color: 'bg-rose-50 border-rose-200',
    accentColor: 'text-rose-700',
    tagColor: 'bg-rose-100 text-rose-700',
  },
  {
    name: 'Nenthra Variety Leaves',
    tamil: 'நேந்திரன் வகை',
    desc: 'Sourced from our Nenthra (Nendran) cultivar plantations, these leaves are broader, with a characteristic pale-cream midrib and robust structural strength. Popular across Kerala-style hotel dining and Sadhya servings. Available year-round in steady supply.',
    note: 'Year-Round Supply',
    color: 'bg-amber-50 border-amber-200',
    accentColor: 'text-amber-700',
    tagColor: 'bg-amber-100 text-amber-800',
  },
  {
    name: 'Poovan Variety Leaves',
    tamil: 'பூவன் வகை',
    desc: 'The most common and versatile variety in our catalog. Poovan leaves offer a balanced combination of width, length, and durability — suitable for both tiffin and light lunch service. Their mild green colour and neutral scent make them universally preferred by caterers.',
    note: 'Everyday Staple',
    color: 'bg-green-50 border-green-200',
    accentColor: 'text-green-700',
    tagColor: 'bg-green-100 text-green-800',
  },
]

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState('tiffin')

  return (
    <section id="catalog" className="py-20 md:py-32 bg-cream-50 relative overflow-hidden">
      <div className="absolute inset-0 leaf-texture opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-leaf-600 font-body text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-leaf-400 inline-block" />
              The Catalog
              <span className="w-8 h-px bg-leaf-400 inline-block" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900 mb-5">
              Our Leaves, <em className="font-accent italic font-normal text-leaf-600">Your Choice</em>
            </h2>
            <p className="font-body text-forest-600 text-base">
              Two main categories. Three specialty cultivars. One consistent promise: the freshest leaves you've ever handled.
            </p>
          </div>
        </FadeIn>

        {/* ⚠️ Market Price Notice */}
        <FadeIn delay={0.1}>
          <motion.div
            className="mb-12 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start"
            animate={{ boxShadow: ['0 0 0 0 rgba(234,179,8,0)', '0 0 0 4px rgba(234,179,8,0.15)', '0 0 0 0 rgba(234,179,8,0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle size={18} className="text-amber-600" />
            </div>
            <div>
              <div className="font-body font-semibold text-amber-800 text-sm mb-1">📊 Daily Market Price Notice</div>
              <p className="font-body text-amber-700 text-sm leading-relaxed">
                Banana leaf prices fluctuate <strong>daily</strong> based on local market conditions, seasonal availability, and festival demand cycles (especially during Pongal, Diwali, Tamil New Year, and wedding seasons). <strong>Please contact us directly</strong> for today's most competitive and accurate bulk pricing. We guarantee the best farm-direct rate.
              </p>
              <a href="tel:6369582188" className="inline-flex items-center gap-1 mt-2 font-body font-semibold text-amber-700 hover:text-amber-900 text-sm transition-colors">
                Get Today's Price <ChevronRight size={14} />
              </a>
            </div>
          </motion.div>
        </FadeIn>

        {/* Main Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {mainCategories.map((cat, i) => (
            <FadeIn key={cat.id} delay={i * 0.15}>
              <div className={`rounded-3xl border-2 p-8 bg-gradient-to-br ${cat.bg} ${cat.border} transition-all duration-400 hover:shadow-xl hover:shadow-forest-900/8 hover:-translate-y-1 group h-full`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="font-display font-bold text-forest-900 text-2xl mb-0.5">{cat.name}</div>
                    <div className="font-accent italic text-forest-500 text-sm">{cat.tamil}</div>
                  </div>
                  <span className={`text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>

                {/* Specs row */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { label: 'Size', val: cat.size },
                    { label: 'Grade', val: cat.grade },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl px-3 py-2 text-xs">
                      <span className="font-body text-forest-500">{s.label}: </span>
                      <span className="font-body font-semibold text-forest-800">{s.val}</span>
                    </div>
                  ))}
                </div>

                <p className="font-body text-forest-700 text-sm leading-relaxed mb-6">{cat.desc}</p>

                {/* Benefits */}
                <ul className="space-y-2 mb-7">
                  {cat.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 font-body text-forest-700 text-sm">
                      <span className="w-5 h-5 rounded-full bg-leaf-200 flex items-center justify-center flex-shrink-0">
                        <Leaf size={10} className="text-forest-700" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="#order"
                  className="w-full block text-center bg-forest-800 hover:bg-forest-700 text-cream-50 font-body font-semibold text-sm py-3 rounded-2xl transition-all duration-300 group-hover:shadow-md"
                >
                  Inquire for Bulk Price
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Specialty Varieties */}
        <FadeIn delay={0.2}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Star size={18} className="text-leaf-500" />
              <h3 className="font-display font-bold text-forest-900 text-2xl">Specialty Cultivar Varieties</h3>
            </div>
            <p className="font-body text-forest-600 text-sm mb-8">
              Each cultivar has distinct characteristics that pair with specific cooking and serving traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specialtyVarieties.map((v, i) => (
              <FadeIn key={v.name} delay={i * 0.1}>
                <div className={`rounded-2xl border p-6 ${v.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`font-display font-semibold text-lg ${v.accentColor} mb-0.5`}>{v.name}</div>
                      <div className="font-accent italic text-forest-500 text-xs">{v.tamil}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-body font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${v.tagColor} inline-block mb-4`}>
                    {v.note}
                  </span>
                  <p className="font-body text-forest-700 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
