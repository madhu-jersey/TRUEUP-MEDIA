import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import { Instagram, ExternalLink } from 'lucide-react'

// ── Data ───────────────────────────────────────────────────────────────────────
const POSTER_CARDS = [
    {
        id: 'p1',
        label: 'Brand Campaigns',
        account: '@trueupmedia',
        url: 'https://www.instagram.com/p/DQBrsKaD_g8/?igsh=MXI4NWFzd2xzeTI3Mg==',
        img: '/poster-omics.png',
        offset: 0,
    },
    {
        id: 'p2',
        label: 'Social Graphics',
        account: '@trueupmedia',
        url: 'https://www.instagram.com/p/DVII9zyEqV5/?igsh=bWc4N3ZncG11d2hp',
        img: '/poster-ethosdental.png',
        offset: 24,
    },
    {
        id: 'p3',
        label: 'Branding & Design',
        account: '@trueupmedia',
        url: 'https://www.instagram.com/trueupmedia/',
        img: 'https://images.unsplash.com/photo-1636955816868-fcb881e57954?w=700&q=80',
        offset: 0,
    },
]

const REEL_CARDS = [
    {
        id: 'r1',
        label: 'Motion Design',
        account: '@trueupmedia',
        url: 'https://www.instagram.com/reel/DVQnWxQiK6I/?igsh=amk0bThhNzIzb2k=',
        gradient: ['rgba(180,255,0,0.22)', 'rgba(60,20,120,0.35)'],
        offset: 16,
    },
    {
        id: 'r2',
        label: 'Brand Films',
        account: '@trueupmedia',
        url: 'https://www.instagram.com/reel/DUZ-7M2EYdF/?igsh=bjlzMTR6d2lyZmtr',
        gradient: ['rgba(255,80,0,0.2)', 'rgba(20,0,80,0.45)'],
        offset: 0,
    },
    {
        id: 'r3',
        label: 'Video Editing',
        account: '@trueupmedia',
        url: 'https://www.instagram.com/reel/DUDMVwtCfaJ/?igsh=cnF1OHYwMTkydHFt',
        gradient: ['rgba(0,150,255,0.18)', 'rgba(10,10,50,0.5)'],
        offset: 24,
    },
]

// ── Grain SVG overlay ──────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`

// ── Cursor-following "Open in Instagram" tag ───────────────────────────────────
function FloatingTag({ active, text }) {
    const mx = useMotionValue(-300)
    const my = useMotionValue(-300)
    const sx = useSpring(mx, { stiffness: 320, damping: 26, mass: 0.4 })
    const sy = useSpring(my, { stiffness: 320, damping: 26, mass: 0.4 })

    useEffect(() => {
        const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [mx, my])

    return (
        <motion.div
            className="fixed z-[9999] pointer-events-none top-0 left-0"
            style={{ x: sx, y: sy, translateX: '14px', translateY: '14px' }}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
            transition={{ duration: 0.18 }}
        >
            <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-outfit font-bold whitespace-nowrap"
                style={{
                    background: 'rgba(5,5,12,0.72)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
                }}
            >
                <Instagram size={12} className="text-lime" />
                {text}
                <ExternalLink size={10} className="text-white/35" />
            </div>
        </motion.div>
    )
}

// ── Vertical rotated column label ─────────────────────────────────────────────
function VerticalLabel({ children }) {
    return (
        <div className="hidden lg:flex items-center justify-center w-8 shrink-0 self-stretch">
            <span
                className="font-outfit font-thin text-[11px] tracking-[0.45em] text-white/25 uppercase select-none"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
                {children}
            </span>
        </div>
    )
}

// ── Poster Card ────────────────────────────────────────────────────────────────
function PosterCard({ card, onHover }) {
    const [hov, setHov] = useState(false)
    const [clicking, setClicking] = useState(false)

    const handleClick = useCallback(
        (e) => {
            e.preventDefault()
            setClicking(true)
            setTimeout(() => {
                setClicking(false)
                window.open(card.url, '_blank', 'noopener,noreferrer')
            }, 280)
        },
        [card.url]
    )

    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden cursor-none"
            style={{ marginTop: card.offset }}
            animate={{ scale: clicking ? 0.93 : 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 220, damping: 20 } }}
            onMouseEnter={() => { setHov(true); onHover(true, 'View on Instagram') }}
            onMouseLeave={() => { setHov(false); onHover(false, '') }}
            onClick={handleClick}
        >
            {/* Image */}
            <motion.img
                src={card.img}
                alt={card.label}
                className="w-full object-cover"
                style={{ height: '280px' }}
                animate={{ scale: hov ? 1.06 : 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
            />

            {/* Grain */}
            <div
                className="absolute inset-0 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
            />

            {/* Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            {/* Hover darken */}
            <motion.div
                className="absolute inset-0 bg-black"
                animate={{ opacity: hov ? 0.42 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Type badge */}
            <div className="absolute top-3.5 left-3.5">
                <span className="text-[9px] font-inter tracking-[0.3em] uppercase text-white/50 bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full">
                    Poster
                </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4">
                <div className="font-outfit font-bold text-white text-sm leading-tight">{card.label}</div>
                <div className="font-inter text-white/40 text-[10px] mt-0.5">{card.account}</div>
            </div>
        </motion.div>
    )
}

// ── Reel Card ──────────────────────────────────────────────────────────────────
function ReelCard({ card, onHover }) {
    const [hov, setHov] = useState(false)
    const [clicking, setClicking] = useState(false)
    const [g1, g2] = card.gradient

    const handleClick = useCallback(
        (e) => {
            e.preventDefault()
            setClicking(true)
            setTimeout(() => {
                setClicking(false)
                window.open(card.url, '_blank', 'noopener,noreferrer')
            }, 280)
        },
        [card.url]
    )

    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden cursor-none"
            style={{ marginTop: card.offset, height: '280px', background: '#04040D' }}
            animate={{ scale: clicking ? 0.93 : 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 220, damping: 20 } }}
            onMouseEnter={() => { setHov(true); onHover(true, 'Watch Reel') }}
            onMouseLeave={() => { setHov(false); onHover(false, '') }}
            onClick={handleClick}
        >
            {/* Cinema gradient orbs */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        `radial-gradient(ellipse 75% 65% at 20% 45%, ${g1} 0%, transparent 65%), radial-gradient(ellipse 60% 75% at 80% 65%, ${g2} 0%, transparent 65%)`,
                        `radial-gradient(ellipse 75% 65% at 75% 55%, ${g1} 0%, transparent 65%), radial-gradient(ellipse 60% 75% at 15% 30%, ${g2} 0%, transparent 65%)`,
                    ],
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />

            {/* Scanlines */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.4) 2px,rgba(255,255,255,.4) 3px)' }}
            />

            {/* Light sweep */}
            <motion.div
                className="absolute inset-y-0 w-20 opacity-10"
                animate={{ left: ['-15%', '115%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }}
            />

            {/* Grain */}
            <div
                className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-50"
                style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
            />

            {/* Hover darken */}
            <motion.div
                className="absolute inset-0 bg-black"
                animate={{ opacity: hov ? 0.35 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Recording dot + badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <motion.div
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(255,0,0,0.9)]"
                />
                <span className="text-[9px] font-inter tracking-[0.3em] uppercase text-white/50 bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full">
                    Reel
                </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4">
                <div className="font-outfit font-bold text-white text-sm leading-tight">{card.label}</div>
                <div className="font-inter text-white/40 text-[10px] mt-0.5">{card.account}</div>
            </div>
        </motion.div>
    )
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function Portfolio() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [tagActive, setTagActive] = useState(false)
    const [tagText, setTagText] = useState('')

    const handleHover = useCallback((active, text) => {
        setTagActive(active)
        setTagText(text)
    }, [])

    const containerVar = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    }
    const cardVar = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 110, damping: 18, mass: 1 },
        },
    }

    return (
        <section
            id="portfolio"
            className="bg-charcoal py-28 px-6 md:px-12 overflow-visible"
            style={{ cursor: tagActive ? 'none' : 'auto' }}
        >
            <FloatingTag active={tagActive} text={tagText} />

            <div ref={ref} className="max-w-7xl mx-auto">
                {/* ── Section Header ── */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-lime" />
                            <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">Our Work</span>
                        </div>
                        <h2
                            className="font-outfit font-black text-white leading-[0.92]"
                            style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                        >
                            Social
                            <br />
                            <span className="italic text-lime">Preview</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3 max-w-sm">
                        <p className="font-inter text-muted text-sm leading-relaxed">
                            Scroll-stopping content for the social-first generation. Hover any card — click to open.
                        </p>
                        <a
                            href="https://www.instagram.com/trueupmedia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-lime font-inter text-sm font-semibold group w-fit"
                        >
                            <Instagram size={14} />
                            <span className="group-hover:underline underline-offset-2">Follow @trueupmedia</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                        </a>
                    </div>
                </div>

                {/* ── Two-column layout ── */}
                <motion.div
                    variants={containerVar}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* ─── POSTERS column ─── */}
                    <div className="flex gap-4">
                        <VerticalLabel>Posters</VerticalLabel>

                        <div className="flex-1">
                            {/* Mobile label */}
                            <div className="flex items-center gap-3 mb-5 lg:hidden">
                                <span className="font-outfit font-thin text-xs tracking-[0.4em] text-white/30 uppercase">Posters</span>
                                <div className="flex-1 h-px bg-white/8" />
                            </div>

                            <motion.div className="flex flex-col gap-4" variants={containerVar}>
                                {POSTER_CARDS.map((card) => (
                                    <motion.div key={card.id} variants={cardVar}>
                                        <PosterCard card={card} onHover={handleHover} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* ─── REELS column ─── */}
                    <div className="flex gap-4">
                        <VerticalLabel>Reels</VerticalLabel>

                        <div className="flex-1">
                            {/* Mobile label */}
                            <div className="flex items-center gap-3 mb-5 lg:hidden">
                                <span className="font-outfit font-thin text-xs tracking-[0.4em] text-white/30 uppercase">Reels</span>
                                <div className="flex-1 h-px bg-white/8" />
                            </div>

                            <motion.div className="flex flex-col gap-4" variants={containerVar}>
                                {REEL_CARDS.map((card) => (
                                    <motion.div key={card.id} variants={cardVar}>
                                        <ReelCard card={card} onHover={handleHover} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
