import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
    {
        q: 'What is True Up Media?',
        a: 'True Up Media is a full-service creative digital agency specialising in brand strategy, social media growth, content production, and performance marketing. We partner with ambitious brands to help them dominate their market.',
    },
    {
        q: 'Who can partner with us?',
        a: 'We work with startups, SMEs, e-commerce brands, and established enterprises across every major industry vertical. If you\'re serious about growing your brand and scaling your digital presence, we\'re the right team for you.',
    },
    {
        q: 'How do I start a project?',
        a: 'Simply click "Get Started" or reach out via hr@vishnuspire.com. We\'ll schedule a discovery call to understand your goals, audience, and budget — then present a tailored strategy within 48 hours.',
    },
    {
        q: 'Is it an individual or team-based agency?',
        a: 'True Up Media is a team of seasoned creatives, strategists, and performance marketers. Each client is assigned a dedicated team — not freelancers — so you always have consistent, high-quality execution.',
    },
    {
        q: 'What are the pricing models?',
        a: 'We offer flexible pricing: project-based engagements for one-off campaigns, retainer models for ongoing brand management, and performance-based structures for growth partnerships. Contact us for a custom quote.',
    },
]

function AccordionItem({ item, index, isOpen, onToggle }) {
    return (
        <div
            className="border-b border-white/10 overflow-hidden"
            style={{ borderTop: index === 0 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}
        >
            {/* Question row */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
                <span
                    className={`font-outfit font-semibold text-base md:text-lg leading-snug transition-colors duration-300
            ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                >
                    {item.q}
                </span>

                {/* Rotating plus icon */}
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300
            ${isOpen
                            ? 'border-lime bg-lime/15 text-lime'
                            : 'border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/70'
                        }`}
                >
                    <Plus size={16} strokeWidth={2} />
                </motion.div>
            </button>

            {/* Answer — AnimatePresence for smooth height + fade */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="font-inter text-muted text-sm md:text-base leading-relaxed pb-6 pr-14">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQ() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [openIndex, setOpenIndex] = useState(0)

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <section
            ref={ref}
            id="faq"
            className="py-28 px-6 md:px-12 relative overflow-hidden bg-charcoal"
        >
            {/* Ambient glow blob */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 55% at 80% 40%, rgba(180,255,0,0.05) 0%, transparent 65%)',
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <span className="w-8 h-px bg-lime" />
                        <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">Support</span>
                    </div>
                    <h2
                        className="font-outfit font-black text-white leading-[0.92] tracking-tight"
                        style={{ fontSize: 'clamp(56px, 10vw, 130px)' }}
                    >
                        FAQ
                    </h2>
                    <p className="font-inter text-muted text-sm md:text-base leading-relaxed mt-4 max-w-md">
                        Everything you need to know before we begin. Can't find an answer?{' '}
                        <a
                            href="mailto:hr@vishnuspire.com"
                            className="text-lime hover:underline underline-offset-2 transition-colors"
                        >
                            Email us directly.
                        </a>
                    </p>
                </motion.div>

                {/* Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    {FAQS.map((item, i) => (
                        <AccordionItem
                            key={i}
                            item={item}
                            index={i}
                            isOpen={openIndex === i}
                            onToggle={() => toggle(i)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
