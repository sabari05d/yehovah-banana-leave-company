import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Plus, Trash2, ChevronRight, ChevronLeft, Package, User, Calendar, MapPin, ClipboardList, Loader2 } from 'lucide-react'

// ------ Validation Helpers ------
function validateStep1(fields) {
  const errors = {}
  if (!fields.name.trim() || fields.name.trim().length < 2) errors.name = 'Please enter your full name (min 2 characters).'
  if (!/^[6-9]\d{9}$/.test(fields.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (fields.altPhone && !/^[6-9]\d{9}$/.test(fields.altPhone)) errors.altPhone = 'Enter a valid 10-digit number or leave blank.'
  if (!fields.organization.trim()) errors.organization = 'Please enter your business/organization name.'
  return errors
}

function validateStep2(fields) {
  const errors = {}
  if (!fields.deliveryLocation.trim() || fields.deliveryLocation.trim().length < 5) errors.deliveryLocation = 'Please provide a full delivery address.'
  if (!fields.deliveryDate) errors.deliveryDate = 'Please select a preferred delivery date.'
  else {
    const selected = new Date(fields.deliveryDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected <= today) errors.deliveryDate = 'Delivery date must be a future date.'
  }
  return errors
}

function validateItems(items) {
  if (items.length === 0) return 'Please add at least one item to your inquiry list.'
  for (const item of items) {
    if (!item.quantity || item.quantity < 1) return 'All items must have a quantity of at least 1.'
  }
  return null
}

// ------ Item Builder ------
const LEAF_CATEGORIES = [
  { value: 'tiffin', label: 'Tiffin Leaves', sub: 'Breakfast & Snacks' },
  { value: 'lunch', label: 'Lunch Leaves', sub: 'Banquets & Weddings' },
  { value: 'chevvazhai', label: 'Red Banana (Chevvazhai)', sub: 'Specialty / Seasonal' },
  { value: 'nenthra', label: 'Nenthra Variety', sub: 'Kerala-Style Sadhu' },
  { value: 'poovan', label: 'Poovan Variety', sub: 'Everyday Staple' },
]

const GRADES = [
  { value: 'premium', label: 'Premium Grade', sub: 'Hand-selected, uniform size' },
  { value: 'standard', label: 'Standard Grade', sub: 'Good quality, slight variance' },
]

const UNITS = ['Bundles (100 pcs)', 'Pieces', 'Kilograms', 'Dozens']

function newItem() {
  return { id: Date.now(), category: 'tiffin', grade: 'premium', quantity: '', unit: 'Bundles (100 pcs)', notes: '' }
}

function ItemRow({ item, onChange, onRemove, showError }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-forest-50/80 border border-forest-100 rounded-2xl p-5 relative"
    >
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-4 right-4 text-forest-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove item"
      >
        <Trash2 size={16} />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8">
        {/* Category */}
        <div>
          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Leaf Category</label>
          <select
            value={item.category}
            onChange={e => onChange({ ...item, category: e.target.value })}
            className="w-full bg-white border border-forest-200 text-forest-800 font-body text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 transition"
          >
            {LEAF_CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Quality Grade</label>
          <select
            value={item.grade}
            onChange={e => onChange({ ...item, grade: e.target.value })}
            className="w-full bg-white border border-forest-200 text-forest-800 font-body text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 transition"
          >
            {GRADES.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Quantity Needed</label>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={e => onChange({ ...item, quantity: e.target.value })}
            placeholder="e.g. 50"
            className={`w-full bg-white border font-body text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 transition ${showError && !item.quantity ? 'border-red-400 bg-red-50' : 'border-forest-200'}`}
          />
          {showError && !item.quantity && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>

        {/* Unit */}
        <div>
          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Unit</label>
          <select
            value={item.unit}
            onChange={e => onChange({ ...item, unit: e.target.value })}
            className="w-full bg-white border border-forest-200 text-forest-800 font-body text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 transition"
          >
            {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Special Notes <span className="text-forest-400 normal-case font-normal">(optional)</span></label>
          <input
            type="text"
            value={item.notes}
            onChange={e => onChange({ ...item, notes: e.target.value })}
            placeholder="e.g. Extra fresh, specific size requirement…"
            className="w-full bg-white border border-forest-200 text-forest-800 font-body text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 transition"
          />
        </div>
      </div>
    </motion.div>
  )
}

// ------ Step Indicator ------
function StepIndicator({ step, total }) {
  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-body font-bold transition-all duration-300 ${i < step ? 'bg-leaf-500 text-white' : i === step ? 'bg-forest-800 text-white' : 'bg-forest-100 text-forest-400'
            }`}>
            {i < step ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 mx-1 w-8 transition-all duration-500 ${i < step ? 'bg-leaf-400' : 'bg-forest-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const STEP_TITLES = ['Your Details', 'Delivery Info', 'Build Your Order']
const STEP_ICONS = [User, MapPin, Package]

// ------ FadeIn ------
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  )
}

// ------ MAIN FORM ------
// const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_ID/exec'
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyne91WURCdiFDzhcq28Otomi6mO19XA_jcLsgnpCbYgV1En5ywoa2FIfrtFmb75xkj/exec';

export default function OrderForm({ onSuccess }) {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showItemError, setShowItemError] = useState(false)

  const [step1, setStep1] = useState({ name: '', phone: '', altPhone: '', organization: '', clientType: 'hotel' })
  const [step2, setStep2] = useState({ deliveryLocation: '', deliveryDate: '', frequency: 'one-time', additionalNotes: '' })
  const [items, setItems] = useState([newItem()])

  const [errors1, setErrors1] = useState({})
  const [errors2, setErrors2] = useState({})

  const today = new Date()
  today.setDate(today.getDate() + 1)
  const minDate = today.toISOString().split('T')[0]

  // Step navigation
  const handleNext = useCallback(() => {
    if (step === 0) {
      const e = validateStep1(step1)
      if (Object.keys(e).length > 0) { setErrors1(e); return }
      setErrors1({})
    }
    if (step === 1) {
      const e = validateStep2(step2)
      if (Object.keys(e).length > 0) { setErrors2(e); return }
      setErrors2({})
    }
    setStep(s => Math.min(s + 1, 2))
  }, [step, step1, step2])

  const handleBack = () => setStep(s => Math.max(s - 1, 0))

  const updateItem = (id, updated) => setItems(prev => prev.map(it => it.id === id ? updated : it))
  const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id))
  const addItem = () => setItems(prev => [...prev, newItem()])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const itemError = validateItems(items)
    if (itemError) { setShowItemError(true); return }

    const payload = {
      timestamp: new Date().toISOString(),
      name: step1.name,
      phone: step1.phone,
      altPhone: step1.altPhone || 'N/A',
      organization: step1.organization,
      clientType: step1.clientType,
      deliveryLocation: step2.deliveryLocation,
      deliveryDate: step2.deliveryDate,
      frequency: step2.frequency,
      additionalNotes: step2.additionalNotes || 'None',
      orderItems: items.map(it => ({
        category: LEAF_CATEGORIES.find(c => c.value === it.category)?.label,
        grade: GRADES.find(g => g.value === it.grade)?.label,
        quantity: it.quantity,
        unit: it.unit,
        notes: it.notes || '',
      })),
      totalLineItems: items.length,
    }

    setSubmitting(true)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (_) { /* Google Apps Script CORS — no-cors is expected */ }
    setSubmitting(false)
    onSuccess()
    // Reset
    setStep(0)
    setStep1({ name: '', phone: '', altPhone: '', organization: '', clientType: 'hotel' })
    setStep2({ deliveryLocation: '', deliveryDate: '', frequency: 'one-time', additionalNotes: '' })
    setItems([newItem()])
  }

  const inputCls = (err) =>
    `w-full bg-white border font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-leaf-200 transition ${err ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-forest-200 focus:border-leaf-500 text-forest-800'
    }`

  return (
    <section id="order" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 leaf-texture opacity-30" />
      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-leaf-600 font-body text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-leaf-400 inline-block" />
              Bulk Inquiry
              <span className="w-8 h-px bg-leaf-400 inline-block" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900 mb-4">
              Request a Custom Quote
            </h2>
            <p className="font-body text-forest-600 text-base max-w-xl mx-auto">
              Build your exact order below. We'll respond with a competitive daily rate within a few hours.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="bg-white rounded-3xl shadow-2xl shadow-forest-900/8 border border-forest-100 overflow-hidden">
            {/* Progress header */}
            <div className="bg-forest-900 px-8 py-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-cream-100 text-lg">
                  {STEP_TITLES[step]}
                </h3>
                <span className="font-body text-forest-400 text-sm">Step {step + 1} of 3</span>
              </div>
              <StepIndicator step={step} total={3} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="px-8 py-8">
                <AnimatePresence mode="wait">
                  {/* ---- STEP 1: Contact Details ---- */}
                  {step === 0 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                          <input type="text" value={step1.name} onChange={e => setStep1(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className={inputCls(errors1.name)} />
                          {errors1.name && <p className="text-red-500 text-xs mt-1">{errors1.name}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Mobile Number *</label>
                          <input type="tel" value={step1.phone} onChange={e => setStep1(p => ({ ...p, phone: e.target.value }))} placeholder="10-digit mobile" maxLength={10} className={inputCls(errors1.phone)} />
                          {errors1.phone && <p className="text-red-500 text-xs mt-1">{errors1.phone}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Alternate Number <span className="text-forest-400 normal-case font-normal">(optional)</span></label>
                          <input type="tel" value={step1.altPhone} onChange={e => setStep1(p => ({ ...p, altPhone: e.target.value }))} placeholder="Alternate mobile" maxLength={10} className={inputCls(errors1.altPhone)} />
                          {errors1.altPhone && <p className="text-red-500 text-xs mt-1">{errors1.altPhone}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Business / Organization Name *</label>
                          <input type="text" value={step1.organization} onChange={e => setStep1(p => ({ ...p, organization: e.target.value }))} placeholder="Hotel, caterer, event company name" className={inputCls(errors1.organization)} />
                          {errors1.organization && <p className="text-red-500 text-xs mt-1">{errors1.organization}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Client Type</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {['hotel', 'caterer', 'event-planner', 'wholesaler', 'tiffin-center', 'other'].map(t => (
                              <button
                                type="button"
                                key={t}
                                onClick={() => setStep1(p => ({ ...p, clientType: t }))}
                                className={`py-2.5 px-3 rounded-xl border text-xs font-body font-medium capitalize transition-all ${step1.clientType === t ? 'bg-forest-800 border-forest-800 text-white' : 'bg-white border-forest-200 text-forest-600 hover:border-forest-400'}`}
                              >
                                {t.replace('-', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ---- STEP 2: Delivery Info ---- */}
                  {step === 1 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Delivery Location / Address *</label>
                          <textarea
                            value={step2.deliveryLocation}
                            onChange={e => setStep2(p => ({ ...p, deliveryLocation: e.target.value }))}
                            placeholder="Full delivery address including city and district"
                            rows={3}
                            className={inputCls(errors2.deliveryLocation) + ' resize-none'}
                          />
                          {errors2.deliveryLocation && <p className="text-red-500 text-xs mt-1">{errors2.deliveryLocation}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Preferred Delivery Date *</label>
                          <input type="date" value={step2.deliveryDate} min={minDate} onChange={e => setStep2(p => ({ ...p, deliveryDate: e.target.value }))} className={inputCls(errors2.deliveryDate)} />
                          {errors2.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors2.deliveryDate}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Order Frequency</label>
                          <select value={step2.frequency} onChange={e => setStep2(p => ({ ...p, frequency: e.target.value }))} className={inputCls(false)}>
                            <option value="one-time">One-Time Order</option>
                            <option value="weekly">Weekly Recurring</option>
                            <option value="bi-weekly">Bi-Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="event-based">Event-Based</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1.5">Additional Notes <span className="text-forest-400 normal-case font-normal">(optional)</span></label>
                          <textarea
                            value={step2.additionalNotes}
                            onChange={e => setStep2(p => ({ ...p, additionalNotes: e.target.value }))}
                            placeholder="Any special requirements, timing preferences, or questions…"
                            rows={3}
                            className={inputCls(false) + ' resize-none'}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ---- STEP 3: Order Items ---- */}
                  {step === 2 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-semibold text-forest-900 text-lg">Your Order List</h4>
                          <p className="font-body text-forest-500 text-xs">Add each leaf type you need as a separate line item.</p>
                        </div>
                        <span className="bg-forest-100 text-forest-700 font-body font-semibold text-xs px-3 py-1.5 rounded-full">
                          {items.length} {items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      {showItemError && items.every(it => it.quantity) === false && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 font-body text-sm rounded-xl px-4 py-3">
                          All items must have a quantity specified.
                        </div>
                      )}

                      <div className="space-y-4 mb-5">
                        <AnimatePresence>
                          {items.map(item => (
                            <ItemRow
                              key={item.id}
                              item={item}
                              onChange={updated => updateItem(item.id, updated)}
                              onRemove={() => removeItem(item.id)}
                              showError={showItemError}
                            />
                          ))}
                        </AnimatePresence>
                      </div>

                      <button
                        type="button"
                        onClick={addItem}
                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-leaf-300 hover:border-leaf-500 text-leaf-700 hover:text-leaf-900 font-body font-medium text-sm py-3.5 rounded-2xl transition-all duration-300 hover:bg-leaf-50"
                      >
                        <Plus size={16} />
                        Add Another Leaf Type
                      </button>

                      {/* Order Summary */}
                      <div className="mt-6 bg-forest-50 rounded-2xl p-5 border border-forest-100">
                        <h5 className="font-body font-semibold text-forest-800 text-sm mb-3 flex items-center gap-2">
                          <ClipboardList size={15} /> Order Summary
                        </h5>
                        <div className="space-y-1.5">
                          <div className="flex justify-between font-body text-xs text-forest-600">
                            <span>Inquiring as:</span>
                            <span className="font-semibold text-forest-800">{step1.name} ({step1.organization})</span>
                          </div>
                          <div className="flex justify-between font-body text-xs text-forest-600">
                            <span>Delivery:</span>
                            <span className="font-semibold text-forest-800">{step2.deliveryDate || '—'}</span>
                          </div>
                          <div className="flex justify-between font-body text-xs text-forest-600">
                            <span>Total Line Items:</span>
                            <span className="font-semibold text-forest-800">{items.length}</span>
                          </div>
                        </div>
                        <p className="mt-3 font-body text-forest-500 text-[11px] italic">
                          * Prices will be confirmed by our team within a few hours based on today's market rate.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className="px-8 pb-8 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 font-body font-medium text-forest-700 hover:text-forest-900 text-sm transition-colors px-4 py-2.5 border border-forest-200 rounded-xl hover:bg-forest-50"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-cream-50 font-body font-semibold text-sm px-7 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-forest-900/20 hover:-translate-y-0.5"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 disabled:bg-forest-300 text-white font-body font-bold text-sm px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-leaf-900/25 hover:-translate-y-0.5 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit Inquiry ✓</>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </FadeIn>

        {/* Alternate contact */}
        <FadeIn delay={0.3}>
          <p className="text-center font-body text-forest-500 text-sm mt-8">
            Prefer to call directly?{' '}
            <a href="tel:6369582188" className="text-forest-800 font-semibold hover:text-leaf-600 transition-colors">+91 63695 82188</a>
            {' '}or{' '}
            <a href="tel:7339104407" className="text-forest-800 font-semibold hover:text-leaf-600 transition-colors">+91 73391 04407</a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
