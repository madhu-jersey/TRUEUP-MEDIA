import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Sparkles, TrendingUp, Users, Headphones } from 'lucide-react'

const REASONS = [
    {
        icon: Layers,
        title: 'Full-Service Under One Roof',
        desc: 'Strategy, content, ads, design — every discipline working in sync. No fragmented agencies, no handoff chaos.',
    },
    {
        icon: Sparkles,
        title: 'Consistently High-Quality Content',
        desc: 'Premium content that resonates, converts, and builds lasting brand equity across every platform.',
    },
    {
        icon: TrendingUp,
        title: 'Data-Driven Strategy',
        desc: 'Every decision is backed by analytics. We track, measure, and optimise relentlessly for maximum ROI.',
    },
    {
        icon: Users,
        title: 'Industry-Experienced Team',
        desc: "Seasoned creatives and strategists who've worked with brands across every major industry vertical.",
    },
    {
        icon: Headphones,
        title: 'End-to-End Support',
        desc: "Dedicated support from kickoff through delivery and beyond. You're never left figuring it out alone.",
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function WhyUs() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="about" className="bg-surface py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-lime" />
                    <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">
                        Why True Up Media
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
                    <h2
                        className="font-outfit font-black text-white leading-[0.92]"
                        style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                    >
                        Why
                        <br />
                        <span className="italic text-lime">Choose Us</span>
                    </h2>
                    <p className="font-inter text-muted text-sm md:text-base max-w-sm leading-relaxed">
                        We combine creativity, strategy, and technology to deliver exceptional, lasting results.
                    </p>
                </div>

                {/* Cards — 3 cols top, 2 cols bottom (asymmetric) */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {REASONS.map((reason, i) => {
                        const Icon = reason.icon
                        // Last 2 cards span wider on lg to fill 3-col grid in 2 rows
                        const isWide = i >= 3
                        return (
                            <motion.div
                                key={reason.title}
                                variants={cardVariants}
                                className={`group glass-card rounded-2xl p-7 hover:border-lime/20 hover:bg-lime/4 transition-all duration-400 ${isWide ? 'lg:col-span-1' : ''
                                    }`}
                                style={{ marginTop: [0, 20, 10, 0, 20][i] }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-lime/30 group-hover:bg-lime/10 transition-all duration-300">
                                    <Icon size={20} className="text-muted group-hover:text-lime transition-colors duration-300" />
                                </div>
                                <h3 className="font-outfit font-bold text-white text-lg mb-3 group-hover:text-lime transition-colors duration-300 leading-snug">
                                    {reason.title}
                                </h3>
                                <p className="font-inter text-muted text-sm leading-relaxed">
                                    {reason.desc}
                                </p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
