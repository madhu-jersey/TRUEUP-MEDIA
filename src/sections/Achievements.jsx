import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
    { value: 250, suffix: '+', label: 'Projects Delivered', desc: 'Across every industry vertical' },
    { value: 2, suffix: '+', label: 'Years Experience', desc: 'Since 2014' },
    { value: 95, suffix: '%', label: 'Client Satisfaction', desc: 'Across all engagements' },
    { value: 100, suffix: '+', label: 'Happy Clients', desc: 'And counting' },
]

function useCountUp(target, inView, duration = 1800) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!inView) return
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [inView, target, duration])
    return count
}

function CountStat({ stat, inView }) {
    const count = useCountUp(stat.value, inView)
    return (
        <div className="group text-center md:text-left">
            <div className="font-outfit font-black text-white leading-none mb-2" style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}>
                <span className="tabular-nums">{count}</span>
                <span className="text-lime">{stat.suffix}</span>
            </div>
            <div className="font-inter text-white/70 text-sm md:text-base font-medium tracking-wide mb-1">
                {stat.label}
            </div>
            <div className="font-inter text-muted text-xs">
                {stat.desc}
            </div>
        </div>
    )
}

export default function Achievements() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="achievements" className="relative bg-charcoal py-32 px-6 md:px-12 overflow-hidden">
            {/* Background lime glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,255,0,0.06) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-lime" />
                    <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">
                        By The Numbers
                    </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
                    <h2
                        className="font-outfit font-black text-white leading-[0.92]"
                        style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                    >
                        Our
                        <br />
                        <span className="italic text-lime">Achievements</span>
                    </h2>
                    <p className="font-inter text-muted text-sm md:text-base max-w-sm leading-relaxed">
                        A decade of delivering real, measurable impact for brands that refuse to be average.
                    </p>
                </div>

                {/* Stat grid */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14"
                >
                    {STATS.map((stat) => (
                        <CountStat key={stat.label} stat={stat} inView={inView} />
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="mt-20 pt-12 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="font-inter text-muted text-sm text-center md:text-left">
                        Trusted by startups, scale-ups, and established brands across industries.
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-lime text-black font-outfit font-bold text-sm px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
                    >
                        Start Your Journey →
                    </a>
                </div>
            </div>
        </section>
    )
}
