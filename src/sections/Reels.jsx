import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, ExternalLink, Play } from 'lucide-react'

// ── Reel data ──────────────────────────────────────────────────────────────────
const REELS = [
    {
        id: 'r1',
        label: 'Motion Design',
        tag: 'Visual Identity',
        url: 'https://www.instagram.com/reel/DVQnWxQiK6I/',
        embedUrl: 'https://www.instagram.com/reel/DVQnWxQiK6I/embed/captioned/',
        accentColor: 'rgba(165,206,64,0.55)',
        glowColor: 'rgba(165,206,64,0.18)',
        offset: 0,        // vertical stagger in px
    },
    {
        id: 'r2',
        label: 'Brand Films',
        tag: 'Cinematic Story',
        url: 'https://www.instagram.com/reel/DUZ-7M2EYdF/',
        embedUrl: 'https://www.instagram.com/reel/DUZ-7M2EYdF/embed/captioned/',
        accentColor: 'rgba(255,100,50,0.55)',
        glowColor: 'rgba(255,100,50,0.18)',
        offset: 60,
    },
    {
        id: 'r3',
        label: 'Video Editing',
        tag: 'Social Content',
        url: 'https://www.instagram.com/reel/DUDMVwtCfaJ/',
        embedUrl: 'https://www.instagram.com/reel/DUDMVwtCfaJ/embed/captioned/',
        accentColor: 'rgba(80,160,255,0.55)',
        glowColor: 'rgba(80,160,255,0.18)',
        offset: 120,
    },
]

// ── Single reel card ───────────────────────────────────────────────────────────
function ReelCard({ reel, delay }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: reel.offset }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: 0 }}
            className="flex flex-col gap-4 group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Card shell ── */}
            <motion.div
                whileHover={{
                    rotateY: -3,
                    rotateX: 2,
                    scale: 1.025,
                    transition: { type: 'spring', stiffness: 280, damping: 22 },
                }}
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                className="relative rounded-3xl overflow-hidden"
            >
                {/* Ambient glow behind card */}
                <motion.div
                    className="absolute -inset-px rounded-3xl pointer-events-none z-10"
                    animate={{
                        boxShadow: hovered
                            ? `0 0 0 1.5px ${reel.accentColor}, 0 0 60px ${reel.glowColor}, 0 30px 80px rgba(0,0,0,0.6)`
                            : `0 0 0 1px rgba(255,255,255,0.07), 0 20px 50px rgba(0,0,0,0.4)`,
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Top accent bar */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none"
                    animate={{
                        background: hovered
                            ? `linear-gradient(90deg, transparent 0%, ${reel.accentColor} 50%, transparent 100%)`
                            : 'transparent',
                        opacity: hovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                />

                {/* Dark base */}
                <div
                    className="relative"
                    style={{ background: '#080810' }}
                >
                    {/* Corner number badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        {/* Blinking record dot */}
                        <motion.div
                            animate={{ opacity: [1, 0.15, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            className="w-2 h-2 rounded-full"
                            style={{
                                background: reel.accentColor,
                                boxShadow: `0 0 8px ${reel.accentColor}`,
                            }}
                        />
                        <span className="text-[9px] font-inter tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
                            style={{
                                background: 'rgba(0,0,0,0.55)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.55)',
                            }}
                        >
                            Reel
                        </span>
                    </div>

                    {/* Play icon overlay on hover */}
                    <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(16px)',
                                border: `1.5px solid ${reel.accentColor}`,
                                boxShadow: `0 0 24px ${reel.glowColor}`,
                            }}
                        >
                            <Play size={20} fill="white" className="text-white ml-0.5" />
                        </div>
                    </motion.div>

                    {/* Instagram iframe */}
                    <iframe
                        src={reel.embedUrl}
                        title={reel.label}
                        className="w-full block"
                        style={{ height: '700px', border: 'none' }}
                        scrolling="no"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        loading="lazy"
                    />

                    {/* Bottom gradient overlay */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
                        style={{
                            background: 'linear-gradient(to top, rgba(8,8,16,0.95) 0%, transparent 100%)',
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Reels() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="reels"
            ref={ref}
            className="relative bg-charcoal py-28 px-6 md:px-12 overflow-hidden"
        >
            {/* Large ambient orbs */}
            <div
                className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(165,206,64,0.06) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(80,160,255,0.05) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Subtle grid dots */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-lime" />
                            <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">
                                Instagram
                            </span>
                        </div>
                        <h2
                            className="font-outfit font-black text-white leading-[0.92]"
                            style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                        >
                            Our
                            <br />
                            <span className="italic text-lime">Reels</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 max-w-sm">
                        <p className="font-inter text-muted text-sm leading-relaxed">
                            Scroll-stopping short-form content built for the social-first
                            generation. Watch. Get inspired. Work with us.
                        </p>
                        <a
                            href="https://www.instagram.com/trueupmedia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-lime font-inter text-sm font-semibold group w-fit"
                        >
                            <Instagram size={14} />
                            <span className="group-hover:underline underline-offset-2">
                                Follow @trueupmedia
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                →
                            </span>
                        </a>
                    </div>
                </motion.div>

                {/* ── Reel grid with vertical stagger ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {REELS.map((reel, i) => (
                        <ReelCard key={reel.id} reel={reel} delay={i * 0.14} />
                    ))}
                </div>
            </div>
        </section>
    )
}
