import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, ExternalLink, ImageIcon } from 'lucide-react'

// ── Poster data ────────────────────────────────────────────────────────────────
const POSTERS = [
    {
        id: 'p1',
        label: 'Brand Campaigns',
        tag: 'Visual Identity',
        url: 'https://www.instagram.com/p/DQBrsKaD_g8/?igsh=MXI4NWFzd2xzeTI3Mg==',
        img: '/poster-omics.png',
        accentColor: 'rgba(165,206,64,0.55)',
        glowColor: 'rgba(165,206,64,0.18)',
        offset: 0,
    },
    {
        id: 'p2',
        label: 'Social Graphics',
        tag: 'Dental Campaign',
        url: 'https://www.instagram.com/p/DVII9zyEqV5/?igsh=bWc4N3ZncG11d2hp',
        img: '/poster-ethosdental.png',
        accentColor: 'rgba(80,180,255,0.55)',
        glowColor: 'rgba(80,180,255,0.18)',
        offset: 60,
    },
    {
        id: 'p3',
        label: 'Branding & Design',
        tag: 'Creative Direction',
        url: 'https://www.instagram.com/p/DSpz6gFkiUq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        img: '/poster-3.png',
        accentColor: 'rgba(255,130,60,0.55)',
        glowColor: 'rgba(255,130,60,0.18)',
        offset: 120,
    },
]

// ── Single poster card ─────────────────────────────────────────────────────────
function PosterCard({ poster, delay }) {
    const [hovered, setHovered] = useState(false)
    const [clicking, setClicking] = useState(false)

    const handleClick = () => {
        setClicking(true)
        setTimeout(() => {
            setClicking(false)
            window.open(poster.url, '_blank', 'noopener,noreferrer')
        }, 250)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: poster.offset }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-0 group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* ── Card shell ── */}
            <motion.div
                whileHover={{
                    rotateY: -3,
                    rotateX: 2,
                    scale: 1.025,
                    transition: { type: 'spring', stiffness: 280, damping: 22 },
                }}
                animate={{ scale: clicking ? 0.95 : 1 }}
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                className="relative rounded-3xl overflow-hidden"
            >
                {/* Glow border */}
                <motion.div
                    className="absolute -inset-px rounded-3xl pointer-events-none z-10"
                    animate={{
                        boxShadow: hovered
                            ? `0 0 0 1.5px ${poster.accentColor}, 0 0 60px ${poster.glowColor}, 0 30px 80px rgba(0,0,0,0.6)`
                            : `0 0 0 1px rgba(255,255,255,0.07), 0 20px 50px rgba(0,0,0,0.4)`,
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Top accent line */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none"
                    animate={{
                        background: hovered
                            ? `linear-gradient(90deg, transparent 0%, ${poster.accentColor} 50%, transparent 100%)`
                            : 'transparent',
                        opacity: hovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                />

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '340px', background: '#080810' }}>
                    <motion.img
                        src={poster.img}
                        alt={poster.label}
                        className="w-full h-full object-cover"
                        animate={{ scale: hovered ? 1.07 : 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        loading="lazy"
                    />

                    {/* Gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Hover darken */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        animate={{ opacity: hovered ? 0.35 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Top badge row */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        <motion.div
                            animate={{ opacity: [1, 0.15, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="w-2 h-2 rounded-full"
                            style={{
                                background: poster.accentColor,
                                boxShadow: `0 0 8px ${poster.accentColor}`,
                            }}
                        />
                        <span
                            className="text-[9px] font-inter tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
                            style={{
                                background: 'rgba(0,0,0,0.55)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.55)',
                            }}
                        >
                            Poster
                        </span>
                    </div>

                    {/* View overlay on hover */}
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
                                border: `1.5px solid ${poster.accentColor}`,
                                boxShadow: `0 0 24px ${poster.glowColor}`,
                            }}
                        >
                            <ImageIcon size={18} className="text-white" />
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </motion.div>
    )
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Posters() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="posters"
            ref={ref}
            className="relative bg-surface py-28 px-6 md:px-12 overflow-hidden"
        >
            {/* Ambient orbs */}
            <div
                className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(165,206,64,0.05) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(80,160,255,0.04) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Dot grid */}
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
                                Our Work
                            </span>
                        </div>
                        <h2
                            className="font-outfit font-black text-white leading-[0.92]"
                            style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                        >
                            Creative
                            <br />
                            <span className="italic text-lime">Posters</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 max-w-sm">
                        <p className="font-inter text-muted text-sm leading-relaxed">
                            Eye-catching brand visuals, campaigns, and social graphics designed
                            to stop the scroll and tell your story.
                        </p>
                        <a
                            href="https://www.instagram.com/trueupmedia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-lime font-inter text-sm font-semibold group w-fit"
                        >
                            <Instagram size={14} />
                            <span className="group-hover:underline underline-offset-2">
                                View on Instagram
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                →
                            </span>
                        </a>
                    </div>
                </motion.div>

                {/* ── Poster grid with stagger ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {POSTERS.map((poster, i) => (
                        <PosterCard key={poster.id} poster={poster} delay={i * 0.14} />
                    ))}
                </div>
            </div>
        </section>
    )
}
