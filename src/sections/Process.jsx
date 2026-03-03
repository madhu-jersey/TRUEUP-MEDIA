import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, Lightbulb, Rocket, BarChart2, RefreshCw, ArrowRight } from 'lucide-react'

const STEPS = [
    {
        number: '01',
        title: 'Discovery & Research',
        icon: Search,
        desc: 'We deep-dive into your brand, audience, competitors, and market. Every great campaign starts with radical clarity.',
        tags: ['Brand Audit', 'Competitor Analysis', 'Persona Research', 'Market Mapping'],
        color: 'rgba(165,206,64,1)',
    },
    {
        number: '02',
        title: 'Strategy & Planning',
        icon: Lightbulb,
        desc: 'We design a bespoke growth roadmap aligned with your goals — no templates, no cookie-cutter approaches.',
        tags: ['Channel Strategy', 'Content Calendar', 'Messaging Framework', 'KPI Definition'],
        color: 'rgba(96,165,250,1)',
    },
    {
        number: '03',
        title: 'Creative Execution',
        icon: Rocket,
        desc: 'Our creative team produces high-impact content — video, design, copy — that stops the scroll and drives action.',
        tags: ['Video Production', 'Graphic Design', 'Copywriting', 'Ad Creative'],
        color: 'rgba(192,132,252,1)',
    },
    {
        number: '04',
        title: 'Launch & Amplify',
        icon: BarChart2,
        desc: 'We go live, monitor performance in real-time, and optimise aggressively to maximise every dollar spent.',
        tags: ['Campaign Deploy', 'A/B Testing', 'Audience Targeting', 'Real-Time Bids'],
        color: 'rgba(251,146,60,1)',
    },
    {
        number: '05',
        title: 'Report & Refine',
        icon: RefreshCw,
        desc: 'Monthly performance reports with clear ROI data. We iterate, improve, and scale what works consistently.',
        tags: ['Custom Dashboards', 'Monthly Reviews', 'Strategic Pivots', 'Scale Winners'],
        color: 'rgba(248,113,113,1)',
    },
]

export default function Process() {
    const sectionRef = useRef(null)
    const entered = useInView(sectionRef, { once: true, margin: '-80px' })
    const sectionVisible = useInView(sectionRef, { margin: '0px' })
    const [activeStep, setActiveStep] = useState(0)

    // Auto-cycle while in view
    useEffect(() => {
        if (!sectionVisible) return
        const id = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % STEPS.length)
        }, 2800)
        return () => clearInterval(id)
    }, [sectionVisible])

    const step = STEPS[activeStep]
    const Icon = step.icon

    return (
        <section id="process" ref={sectionRef} className="bg-surface py-28 px-6 md:px-12 relative overflow-hidden">
            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={entered ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-lime" />
                            <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">How We Work</span>
                        </div>
                        <h2
                            className="font-outfit font-black text-white leading-[0.92]"
                            style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                        >
                            Our<br />
                            <span className="italic text-lime">Process</span>
                        </h2>
                    </div>
                    <p className="font-inter text-muted text-sm md:text-base leading-relaxed max-w-sm">
                        A battle-tested 5-step system that turns strategy into measurable brand growth.
                    </p>
                </motion.div>

                {/* ── Step tabs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={entered ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide"
                >
                    {STEPS.map((s, i) => (
                        <button
                            key={s.number}
                            onClick={() => setActiveStep(i)}
                            className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-full border text-sm font-inter transition-all duration-300"
                            style={{
                                borderColor: activeStep === i ? step.color.replace('1)', '0.5)') : 'rgba(255,255,255,0.10)',
                                background: activeStep === i ? step.color.replace('1)', '0.10)') : 'transparent',
                                color: activeStep === i ? step.color : 'rgba(255,255,255,0.40)',
                            }}
                        >
                            {/* Bold number badge */}
                            <span
                                className="font-outfit font-black text-sm w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                style={{
                                    background: activeStep === i ? step.color : 'rgba(255,255,255,0.08)',
                                    color: activeStep === i ? '#000' : 'rgba(255,255,255,0.5)',
                                }}
                            >
                                {i + 1}
                            </span>
                            <span className="font-medium hidden sm:inline">{s.title}</span>
                        </button>
                    ))}
                </motion.div>

                {/* ── Active step detail ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="grid lg:grid-cols-5 gap-6 lg:gap-8"
                    >
                        {/* Left: large number + description card */}
                        <div className="lg:col-span-3">
                            <div
                                className="relative rounded-3xl border border-white/8 overflow-hidden p-8 md:p-12 h-full"
                                style={{ background: 'rgba(255,255,255,0.025)' }}
                            >
                                {/* Accent glow */}
                                <div
                                    className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${step.color.replace('1)', '0.10)')} 0%, transparent 70%)`,
                                        transform: 'translate(30%, -30%)',
                                    }}
                                />

                                {/* Giant number watermark */}
                                <div
                                    className="font-outfit font-black leading-none select-none mb-6"
                                    style={{
                                        fontSize: 'clamp(96px, 18vw, 220px)',
                                        color: step.color.replace('1)', '0.22)'),
                                        WebkitTextStroke: `1px ${step.color.replace('1)', '0.35)')}`,
                                        lineHeight: 1,
                                    }}
                                >
                                    {step.number}
                                </div>

                                {/* Icon + title */}
                                <div className="flex items-start gap-4 mb-5 relative z-10">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border"
                                        style={{
                                            background: step.color.replace('1)', '0.10)'),
                                            borderColor: step.color.replace('1)', '0.25)'),
                                        }}
                                    >
                                        <Icon size={22} style={{ color: step.color }} />
                                    </div>
                                    <h3 className="font-outfit font-black text-white text-2xl md:text-3xl leading-snug pt-1">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="font-inter text-white/55 text-base md:text-lg leading-relaxed relative z-10">
                                    {step.desc}
                                </p>
                            </div>
                        </div>

                        {/* Right: tags + progress */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            {/* Tag pills */}
                            <div
                                className="flex-1 rounded-3xl border border-white/8 p-7 flex flex-col gap-3"
                                style={{ background: 'rgba(255,255,255,0.025)' }}
                            >
                                <p className="font-inter text-xs tracking-widest text-white/30 uppercase mb-1">
                                    What's Included
                                </p>
                                {step.tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ background: step.color }}
                                        />
                                        <span className="font-inter text-sm text-white/65 group-hover:text-white transition-colors duration-200">
                                            {tag}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Step progress card */}
                            <div
                                className="rounded-3xl border border-white/8 p-7"
                                style={{ background: 'rgba(255,255,255,0.025)' }}
                            >
                                <p className="font-inter text-xs tracking-widest text-white/30 uppercase mb-4">
                                    Progress
                                </p>
                                <div className="flex gap-2 mb-5">
                                    {STEPS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveStep(i)}
                                            className="h-1 flex-1 rounded-full transition-all duration-400"
                                            style={{
                                                background: i < activeStep
                                                    ? step.color.replace('1)', '0.5)')
                                                    : i === activeStep
                                                        ? step.color
                                                        : 'rgba(255,255,255,0.10)',
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-inter text-xs text-white/35">
                                        Step {activeStep + 1} of {STEPS.length}
                                    </span>
                                    <button
                                        onClick={() => setActiveStep((activeStep + 1) % STEPS.length)}
                                        className="flex items-center gap-1.5 font-inter text-xs font-semibold transition-colors duration-200"
                                        style={{ color: step.color }}
                                    >
                                        Next step <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
