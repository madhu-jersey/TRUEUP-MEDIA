import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Client logos (1.png – 19.png from /public) ────────────────────────────────
const PARTNERS = [
    { name: 'Client 1', src: '/1.png' },
    { name: 'Client 2', src: '/2.png' },
    { name: 'Client 3', src: '/3.png' },
    { name: 'Client 4', src: '/4.png' },
    { name: 'Client 5', src: '/5.png' },
    { name: 'Client 6', src: '/6.png' },
    { name: 'Client 7', src: '/7.png' },
    { name: 'Client 8', src: '/8.png' },
    { name: 'Client 9', src: '/9.png' },
    { name: 'Client 10', src: '/10.png' },
    { name: 'Client 11', src: '/11.png' },
    { name: 'Client 12', src: '/12.png' },
    { name: 'Client 13', src: '/13.png' },
    { name: 'Client 14', src: '/14.png' },
    { name: 'Client 15', src: '/15.png' },
    { name: 'Client 16', src: '/16.png' },
    { name: 'Client 17', src: '/17.png' },
    { name: 'Client 18', src: '/18.png' },
    { name: 'Client 19', src: '/19.png' },
]

// Triplicate for seamless loop
const TRACK_A = [...PARTNERS, ...PARTNERS, ...PARTNERS]
const TRACK_B = [...PARTNERS, ...PARTNERS, ...PARTNERS].reverse()

function LogoItem({ partner }) {
    return (
        <div className="group/logo flex-shrink-0 px-3">
            <div
                className="relative flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-500"
                style={{ minWidth: '140px', height: '80px' }}
            >
                {/* Logo image — grayscale + dim at rest, full colour on hover */}
                <img
                    src={partner.src}
                    alt={partner.name}
                    className="max-h-14 max-w-[120px] w-auto object-contain select-none transition-all duration-500"
                    style={{ filter: 'grayscale(100%)', opacity: 0.45 }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%)'
                        e.currentTarget.style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'grayscale(100%)'
                        e.currentTarget.style.opacity = '0.45'
                    }}
                    draggable={false}
                />

                {/* Lime glow ring on hover */}
                <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                        boxShadow:
                            '0 0 0 1px rgba(165,206,64,0.25), 0 0 18px rgba(165,206,64,0.15)',
                    }}
                />
            </div>
        </div>
    )
}

export default function LogoMarquee() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const edgeMask =
        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'

    return (
        <section ref={ref} className="bg-surface py-24 overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 md:px-12 max-w-7xl mx-auto mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-px bg-lime" />
                        <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">
                            Trusted By
                        </span>
                    </div>
                    <h2
                        className="font-outfit font-black text-white leading-[0.92]"
                        style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
                    >
                        Our<br />
                        <span className="italic text-lime">Clients</span>
                    </h2>
                </div>
                <p className="font-inter text-muted text-sm leading-relaxed max-w-xs">
                    Real brands that trust True Up Media to grow, scale, and dominate their market.
                </p>
            </motion.div>

            {/* ── Marquee container with CSS edge mask ── */}
            <div
                style={{
                    maskImage: edgeMask,
                    WebkitMaskImage: edgeMask,
                }}
            >
                {/* Row 1 — slides left */}
                <div className="flex overflow-hidden mb-3">
                    <motion.div
                        className="flex"
                        animate={{ x: ['0%', '-33.333%'] }}
                        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                    >
                        {TRACK_A.map((p, i) => (
                            <LogoItem key={`a-${i}`} partner={p} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 — slides right */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: ['-33.333%', '0%'] }}
                        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                    >
                        {TRACK_B.map((p, i) => (
                            <LogoItem key={`b-${i}`} partner={p} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 text-center font-inter text-muted text-xs px-6"
            >
                Hover a logo to reveal their true colours.
            </motion.p>
        </section>
    )
}
