import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

// ── Per-field validators ─────────────────────────────────────────────────────
const VALIDATORS = {
    name: (v) => {
        if (!v.trim()) return 'Name is required'
        if (v.trim().length < 2) return 'Name must be at least 2 characters'
        return ''
    },
    email: (v) => {
        if (!v.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address'
        return ''
    },
    mobile: (v) => {
        if (!v.trim()) return 'Mobile number is required'
        if (!/^[+]?[\d\s\-()]{7,15}$/.test(v.trim())) return 'Enter a valid phone number'
        return ''
    },
    message: (v) => {
        if (!v.trim()) return 'Message is required'
        if (v.trim().length < 10) return 'Message must be at least 10 characters'
        return ''
    },
}

const INITIAL_FORM = { name: '', email: '', mobile: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '', mobile: '', message: '' }
const INITIAL_TOUCHED = { name: false, email: false, mobile: false, message: false }

export default function Contact() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [form, setForm] = useState(INITIAL_FORM)
    const [errors, setErrors] = useState(INITIAL_ERRORS)
    const [touched, setTouched] = useState(INITIAL_TOUCHED)

    const validate = (fields = form) => {
        const errs = {}
        Object.keys(VALIDATORS).forEach((k) => {
            errs[k] = VALIDATORS[k](fields[k])
        })
        return errs
    }

    const handleChange = (field, value) => {
        const newForm = { ...form, [field]: value }
        setForm(newForm)
        if (touched[field]) {
            setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](value) }))
        }
    }

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](form[field]) }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const allTouched = { name: true, email: true, mobile: true, message: true }
        setTouched(allTouched)
        const errs = validate()
        setErrors(errs)
        if (Object.values(errs).some(Boolean)) return

        const text = [
            `New Inquiry - TrueUp Media`,
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Mobile: ${form.mobile}`,
            `Message: ${form.message}`,
        ].join('\n')

        window.open(
            `https://wa.me/919515893777?text=${encodeURIComponent(text)}`,
            '_blank',
            'noopener,noreferrer'
        )
        setStatus('success')
        setForm(INITIAL_FORM)
        setTouched(INITIAL_TOUCHED)
    }

    return (
        <section id="contact" className="relative bg-charcoal py-32 px-6 md:px-12 overflow-hidden">
            {/* Radial spotlight */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(180,255,0,0.07) 0%, transparent 70%)',
                }}
            />
            {/* Grid dots */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-lime" />
                    <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">
                        Get In Touch
                    </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2
                            className="font-outfit font-black text-white leading-[0.92] mb-6"
                            style={{ fontSize: 'clamp(44px, 7vw, 100px)' }}
                        >
                            Let's Build
                            <br />
                            <span className="italic text-lime">Something</span>
                            <br />
                            Great.
                        </h2>
                        <p className="font-inter text-muted text-base leading-relaxed mb-8 max-w-md">
                            Ready to transform your brand? Drop us a message and we'll get back to you within
                            24 hours with a custom strategy outline.
                        </p>
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:hr@vishnuspire.com"
                                className="inline-flex items-center gap-3 text-white/70 hover:text-lime transition-colors font-inter text-sm"
                            >
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Mail size={15} className="text-muted" />
                                </div>
                                hr@vishnuspire.com
                            </a>
                            <a
                                href="tel:+919515893777"
                                className="inline-flex items-center gap-3 text-white/70 hover:text-lime transition-colors font-inter text-sm"
                            >
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Phone size={15} className="text-muted" />
                                </div>
                                +91 95158 93777
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: form card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card rounded-3xl p-8 border border-white/8"
                    >
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center text-center gap-5 py-10">
                                <div className="w-16 h-16 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center">
                                    <CheckCircle size={28} className="text-lime" />
                                </div>
                                <h3 className="font-outfit font-bold text-white text-2xl">Message Sent!</h3>
                                <p className="font-inter text-muted text-sm max-w-xs">
                                    WhatsApp opened with your message. We'll get back to you shortly!
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                                {/* Row 1: Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        label="Name *"
                                        placeholder="Your Name"
                                        value={form.name}
                                        error={touched.name ? errors.name : ''}
                                        onChange={(v) => handleChange('name', v)}
                                        onBlur={() => handleBlur('name')}
                                    />
                                    <FormField
                                        label="Email *"
                                        type="email"
                                        placeholder="you@company.com"
                                        value={form.email}
                                        error={touched.email ? errors.email : ''}
                                        onChange={(v) => handleChange('email', v)}
                                        onBlur={() => handleBlur('email')}
                                    />
                                </div>

                                {/* Row 2: Mobile (full width) */}
                                <FormField
                                    label="Mobile Number *"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={form.mobile}
                                    error={touched.mobile ? errors.mobile : ''}
                                    onChange={(v) => handleChange('mobile', v)}
                                    onBlur={() => handleBlur('mobile')}
                                />

                                {/* Row 3: Message */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-inter text-xs text-white/60 tracking-wide">
                                        Message *
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your brand and goals..."
                                        value={form.message}
                                        onChange={(e) => handleChange('message', e.target.value)}
                                        onBlur={() => handleBlur('message')}
                                        className={`w-full bg-white rounded-xl px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 resize-none border-2 ${touched.message && errors.message
                                            ? 'border-red-400 focus:border-red-400'
                                            : 'border-transparent focus:border-lime/50'
                                            }`}
                                    />
                                    {touched.message && errors.message && (
                                        <ErrorMsg msg={errors.message} />
                                    )}
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                                        <p className="font-inter text-red-400 text-xs">
                                            Something went wrong. Please try again or email us directly.
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="group mt-1 inline-flex items-center justify-center gap-2 bg-lime text-black font-outfit font-bold text-sm px-7 py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-200 glow-lime"
                                >
                                    Send Message
                                    <ArrowRight
                                        size={16}
                                        className="group-hover:translate-x-1 transition-transform duration-200"
                                    />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// ── Reusable field ────────────────────────────────────────────────────────────
function FormField({ label, placeholder, value, error, onChange, onBlur, type = 'text' }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-inter text-xs text-white/60 tracking-wide">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className={`w-full bg-white rounded-xl px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 border-2 ${error
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-transparent focus:border-lime/50'
                    }`}
            />
            {error && <ErrorMsg msg={error} />}
        </div>
    )
}

function ErrorMsg({ msg }) {
    return (
        <div className="flex items-center gap-1.5">
            <AlertCircle size={11} className="text-red-400 flex-shrink-0" />
            <span className="font-inter text-xs text-red-400">{msg}</span>
        </div>
    )
}
