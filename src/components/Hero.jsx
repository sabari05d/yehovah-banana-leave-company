import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Instagram } from 'lucide-react'

// Decorative banana leaf SVG shape
function LeafShape({ className, delay = 0, scale = 1, rotation = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.6, rotate: rotation - 20 }}
      animate={{
        opacity: 1,
        scale,
        rotate: rotation,
        y: [0, -18, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        scale: { duration: 1.2, delay },
        rotate: { duration: 1.2, delay },
        y: { duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 },
      }}
    >
      <svg viewBox="0 0 120 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <path
          d="M60 10 C10 60, -10 140, 20 200 C35 240, 55 270, 60 290 C65 270, 85 240, 100 200 C130 140, 110 60, 60 10Z"
          fill="currentColor"
          className="text-forest-600"
          opacity="0.85"
        />
        <path
          d="M60 10 C60 10, 60 150, 60 290"
          stroke="currentColor"
          className="text-leaf-400"
          strokeWidth="2"
          opacity="0.6"
        />
        {[1,2,3,4,5,6,7,8].map((i) => (
          <line
            key={i}
            x1={60}
            y1={20 + i * 30}
            x2={60 + (i % 2 === 0 ? 28 : -28)}
            y2={30 + i * 30}
            stroke="currentColor"
            className="text-leaf-400"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream-50 via-forest-50 to-leaf-50 pt-16"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 leaf-texture" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314532d' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative leaves */}
      <LeafShape className="w-24 md:w-40 h-60 md:h-96 -right-6 top-10 text-forest-600" delay={0.5} scale={1} rotation={-25} />
      <LeafShape className="w-16 md:w-28 h-40 md:h-64 -right-2 md:right-32 top-0 text-leaf-500" delay={0.8} scale={0.8} rotation={15} />
      <LeafShape className="w-20 md:w-32 h-48 md:h-80 -left-8 bottom-0 text-forest-700" delay={0.6} scale={0.9} rotation={20} />
      <LeafShape className="w-12 md:w-20 h-32 md:h-52 left-16 md:left-1/3 top-8 text-leaf-600" delay={1.0} scale={0.6} rotation={-10} />

      {/* Organic blob */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-leaf-200/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-forest-200/40 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-leaf-100 border border-leaf-200 text-forest-700 text-xs font-body font-medium px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-leaf-500 animate-pulse" />
            Direct Farm to Table — Daily Harvest
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-forest-900 leading-[1.05] mb-4"
          >
            Freshness{' '}
            <em className="font-accent font-normal italic text-leaf-600 not-italic">
              Delivered
            </em>
            <br />
            <span className="shimmer-text">Daily.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="font-accent text-2xl md:text-3xl italic text-forest-600 mb-3 font-light"
          >
            Pure Leaves. Pure Tradition.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="font-body text-forest-700 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Premium banana leaves harvested at dawn from the fertile Western Ghats foothills of{' '}
            <strong className="text-forest-900 font-semibold">Sathyamangalam, Erode</strong>.
            Serving hotels, caterers, and event planners across Tamil Nadu with unmatched freshness.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#catalog"
              className="group inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-cream-50 font-body font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-forest-900/30 hover:-translate-y-1"
            >
              Explore Varieties
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#order"
              className="group inline-flex items-center gap-2 border-2 border-forest-700 text-forest-800 hover:bg-forest-50 font-body font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1"
            >
              Place Custom Inquiry
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-forest-200/60"
          >
            {[
              { num: '15+', label: 'Years Farming' },
              { num: '500+', label: 'Happy Clients' },
              { num: 'Daily', label: 'Fresh Harvest' },
              { num: 'PAN TN', label: 'Delivery Range' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-forest-800">{stat.num}</div>
                <div className="font-body text-xs text-forest-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden md:flex justify-center items-center relative"
        >
          {/* Main visual card */}
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-leaf-300/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner circle */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-forest-100 to-leaf-100 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
                  {/* Stylized banana leaf */}
                  <ellipse cx="100" cy="100" rx="45" ry="85" fill="#166534" transform="rotate(-20 100 100)" opacity="0.9" />
                  <ellipse cx="100" cy="100" rx="35" ry="75" fill="#16a34a" transform="rotate(-20 100 100)" opacity="0.7" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="#4ade80" strokeWidth="2" transform="rotate(-20 100 100)" opacity="0.6" />
                  {[1,2,3,4,5,6,7].map((i) => (
                    <React.Fragment key={i}>
                      <line x1="100" y1={30 + i * 20} x2={100 + 30} y2={35 + i * 20} stroke="#4ade80" strokeWidth="1" transform="rotate(-20 100 100)" opacity="0.5" />
                      <line x1="100" y1={30 + i * 20} x2={100 - 30} y2={35 + i * 20} stroke="#4ade80" strokeWidth="1" transform="rotate(-20 100 100)" opacity="0.5" />
                    </React.Fragment>
                  ))}
                  {/* Second leaf */}
                  <ellipse cx="100" cy="100" rx="38" ry="75" fill="#15803d" transform="rotate(25 100 100)" opacity="0.7" />
                  <ellipse cx="100" cy="100" rx="28" ry="65" fill="#22c55e" transform="rotate(25 100 100)" opacity="0.5" />
                </svg>
              </div>
              {/* Center text */}
              <div className="relative z-10 text-center">
                <div className="font-display font-bold text-forest-900 text-lg leading-tight">YEHOVAH</div>
                <div className="font-body text-forest-700 text-xs uppercase tracking-widest">Fresh Banana Leaves</div>
              </div>
            </div>
            {/* Floating mini-cards around circle */}
            {[
              { angle: 0, text: 'Tiffin Leaves', sub: 'Breakfast & Snacks', color: 'bg-leaf-50 border-leaf-200' },
              { angle: 120, text: 'Lunch Leaves', sub: 'Banquets & Weddings', color: 'bg-forest-50 border-forest-200' },
              { angle: 240, text: 'Red Banana', sub: 'Chevvazhai Special', color: 'bg-bark-50 border-bark-200' },
            ].map((card, i) => {
              const rad = (card.angle - 90) * (Math.PI / 180)
              const r = 175
              const x = 50 + (r / 3.84) * Math.cos(rad)
              const y = 50 + (r / 3.84) * Math.sin(rad)
              return (
                <motion.div
                  key={card.text}
                  className={`absolute glass border ${card.color} rounded-xl px-3 py-2 text-center shadow-md`}
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', width: '110px' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                >
                  <div className="font-body font-semibold text-forest-800 text-xs">{card.text}</div>
                  <div className="font-body text-forest-500 text-[9px]">{card.sub}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-forest-500 text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          className="w-5 h-8 border-2 border-forest-400 rounded-full flex items-start justify-center pt-1.5"
          animate={{}}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-forest-500"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
