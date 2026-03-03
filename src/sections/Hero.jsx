import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Users, Award, Zap } from 'lucide-react'

const STATS = [
    { icon: TrendingUp, value: '250+', label: 'Projects Delivered' },
    { icon: Award, value: '2+', label: 'Years Experience' },
    { icon: Users, value: '100+', label: 'Happy Clients' },
    { icon: Zap, value: '95%', label: 'Client Satisfaction' },
]

const TICKER_ITEMS = [...STATS, ...STATS, ...STATS]

export default function Hero() {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (inView) controls.start('visible')
    }, [inView, controls])

    const ease = [0.22, 1, 0.36, 1]

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col bg-charcoal overflow-hidden"
        >
            {/* ── Background: horizontal lines grid ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* ── Lime radial spotlight top-left ── */}
            <div
                className="absolute -top-40 -left-40 w-[720px] h-[720px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(165,206,64,0.13) 0%, transparent 65%)',
                }}
            />
            {/* ── Secondary glow bottom-right ── */}
            <div
                className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(165,206,64,0.07) 0%, transparent 65%)',
                }}
            />

            {/* ── Main content — fills between header & ticker ── */}
            <div
                ref={ref}
                className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center pt-36 pb-12"
            >
                {/* Eyebrow tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                    className="flex items-center gap-3 mb-10"
                >
                    <span className="w-8 h-px bg-lime" />
                    <span className="font-inter text-xs tracking-[0.3em] text-lime uppercase font-medium">
                        Creative Digital Agency
                    </span>
                    <span className="ml-4 px-3 py-1 rounded-full border border-lime/20 bg-lime/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                        <span className="font-inter text-[10px] text-white/50 tracking-widest uppercase">Est. 2014</span>
                    </span>
                </motion.div>

                {/* ── Headline + right column layout ── */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-8">

                    {/* LEFT: Massive headline */}
                    <div className="flex-1">
                        {/* Line 1 */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 100, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.85, ease, delay: 0.1 }}
                                className="font-outfit font-black text-white leading-[0.88]"
                                style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
                            >
                                We Build
                            </motion.h1>
                        </div>

                        {/* Line 2 — outlined + lime fill combo */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.85, ease, delay: 0.2 }}
                                className="font-outfit font-black italic leading-[0.88] text-lime"
                                style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
                            >
                                Brands That
                            </motion.div>
                        </div>

                        {/* Line 3 — outlined (stroke only) */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.85, ease, delay: 0.3 }}
                                className="font-outfit font-black leading-[0.88]"
                                style={{
                                    fontSize: 'clamp(56px, 10vw, 140px)',
                                    color: 'transparent',
                                    WebkitTextStroke: '2px rgba(255,255,255,0.85)',
                                }}
                            >
                                Dominate.
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT: descriptor + stats column */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease, delay: 0.4 }}
                        className="lg:max-w-xs flex flex-col gap-8 lg:pb-2"
                    >
                        {/* Description */}
                        <p className="font-inter text-white/50 text-sm leading-relaxed">
                            Full-service brand marketing & digital growth agency. We transform
                            ideas into high-impact digital experiences across every platform.
                        </p>

                        {/* Stat grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map(({ icon: Icon, value, label }) => (
                                <div
                                    key={label}
                                    className="rounded-2xl border border-white/8 p-4 flex flex-col gap-2"
                                    style={{ background: 'rgba(255,255,255,0.025)' }}
                                >
                                    <Icon size={14} className="text-lime opacity-70" />
                                    <span className="font-outfit font-black text-white text-2xl leading-none">
                                        {value}
                                    </span>
                                    <span className="font-inter text-white/35 text-[11px] leading-tight">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── CTA row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.55 }}
                    className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                    <a
                        href="#portfolio"
                        className="group inline-flex items-center gap-2.5 bg-lime text-black font-outfit font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 glow-lime"
                    >
                        View Our Work
                        <ArrowUpRight
                            size={16}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                    </a>
                    <a
                        href="#services"
                        className="group inline-flex items-center gap-2 border border-white/15 text-white/60 font-outfit font-semibold text-sm px-8 py-4 rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
                    >
                        Our Services
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </a>

                    {/* Separator dot */}
                    <div className="hidden sm:flex items-center gap-3 ml-4">
                        <div className="w-px h-8 bg-white/10" />
                        <span className="font-inter text-[11px] text-white/30 max-w-[140px] leading-snug">
                            Trusted by 200+ brands across India
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-28 right-12 hidden lg:flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-10 bg-gradient-to-b from-lime/60 to-transparent"
                />
                <span className="font-inter text-[9px] tracking-[0.25em] text-white/25 uppercase rotate-90 origin-center translate-y-6">
                    Scroll
                </span>
            </motion.div>

            {/* ── Stat Ticker ── */}
            <StatTicker />
        </section>
    )
}

function StatTicker() {
    return (
        <div className="relative border-t border-white/8 py-5 overflow-hidden bg-black/25 z-10">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-charcoal to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-charcoal to-transparent" />

            <motion.div
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: ['0%', '-33.33%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
                {TICKER_ITEMS.map(({ icon: Icon, value, label }, i) => (
                    <div key={i} className="flex items-center gap-3 flex-shrink-0">
                        <Icon size={13} className="text-lime opacity-60" />
                        <span className="font-outfit font-black text-white text-base tracking-tight">
                            {value}
                        </span>
                        <span className="font-inter text-[11px] text-white/35 uppercase tracking-widest">
                            {label}
                        </span>
                        <span className="text-white/15 text-sm">·</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
