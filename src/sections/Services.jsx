import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    PenTool,
    Megaphone,
    Image,
    Package,
    Search,
    Box,
    Layers,
    ArrowUpRight,
} from 'lucide-react'

const SERVICES = [
    {
        icon: PenTool,
        title: 'Logo Design',
        desc: 'Distinctive, memorable logos crafted to represent your brand identity across every touchpoint.',
        tag: '01',
        color: 'rgba(165,206,64,0.9)',
    },
    {
        icon: Megaphone,
        title: 'Brand Marketing Packages (Ads)',
        desc: 'Full-funnel ad campaigns on Meta, Google & more — built to grow your audience and convert leads.',
        tag: '02',
        color: 'rgba(96,165,250,0.9)',
    },
    {
        icon: Image,
        title: 'Festival Poster Packs',
        desc: 'Stunning, on-brand festival and occasion posters delivered ready-to-post across all platforms.',
        tag: '03',
        color: 'rgba(251,146,60,0.9)',
    },
    {
        icon: Layers,
        title: 'Special Packs (Video & Poster)',
        desc: 'Combined video editing and poster design bundles for maximum impact at key brand moments.',
        tag: '04',
        color: 'rgba(192,132,252,0.9)',
    },
    {
        icon: Search,
        title: 'Google SEO',
        desc: 'Data-driven search optimisation strategies to rank higher, drive organic traffic, and grow sustainably.',
        tag: '05',
        color: 'rgba(34,211,238,0.9)',
    },
    {
        icon: Package,
        title: 'Brand Packaging',
        desc: 'Cohesive brand packaging systems — colours, typography, guidelines — built for recognition and trust.',
        tag: '06',
        color: 'rgba(244,114,182,0.9)',
    },
    {
        icon: Box,
        title: 'Packing Design',
        desc: 'Creative, shelf-ready product packaging designs that communicate quality and captivate customers.',
        tag: '07',
        color: 'rgba(163,230,53,0.9)',
    },
]

export default function Services() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [hoveredIndex, setHoveredIndex] = useState(null)

    return (
        <section id="services" ref={ref} className="bg-charcoal py-28 px-6 md:px-12 relative overflow-hidden">
            {/* Subtle top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(165,206,64,0.18), transparent)' }}
            />

            <div className="max-w-7xl mx-auto">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-lime" />
                            <span className="font-inter text-xs tracking-[0.25em] text-lime uppercase">What We Do</span>
                        </div>
                        <h2
                            className="font-outfit font-black text-white leading-[0.92]"
                            style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
                        >
                            Our<br />
                            <span className="italic text-lime">Services</span>
                        </h2>
                    </div>
                    <p className="font-inter text-muted text-sm md:text-base leading-relaxed max-w-sm">
                        Seven specialised services working as one integrated system — built
                        to grow your brand at every stage.
                    </p>
                </motion.div>

                {/* ── Service rows ── */}
                <div className="flex flex-col">
                    {SERVICES.map((service, i) => (
                        <ServiceRow
                            key={service.tag}
                            service={service}
                            index={i}
                            inView={inView}
                            isHovered={hoveredIndex === i}
                            anyHovered={hoveredIndex !== null}
                            onHover={() => setHoveredIndex(i)}
                            onLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-14 flex justify-center"
                >
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lime text-black font-outfit font-bold text-sm hover:bg-white transition-colors duration-300"
                    >
                        Start a Project
                        <ArrowUpRight
                            size={16}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

function ServiceRow({ service, index, inView, isHovered, anyHovered, onHover, onLeave }) {
    const Icon = service.icon

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView
                ? {
                    opacity: anyHovered && !isHovered ? 0.4 : 1,
                    x: 0,
                }
                : { opacity: 0, x: -40 }}
            transition={{ duration: 0.45, delay: inView ? index * 0.07 : 0, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="group relative cursor-pointer"
            style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                borderBottom: index === 6 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
        >
            {/* Hover background fill */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `linear-gradient(90deg, ${service.color.replace('0.9', '0.06')} 0%, transparent 60%)` }}
            />

            {/* Left accent bar */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                animate={{ scaleY: isHovered ? 1 : 0, backgroundColor: service.color }}
                initial={{ scaleY: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'top', backgroundColor: service.color }}
            />

            <div className="relative z-10 flex items-center gap-6 md:gap-10 py-6 md:py-7 pl-5 pr-4">

                {/* Number */}
                <span
                    className="font-outfit font-black text-2xl md:text-3xl w-12 flex-shrink-0 transition-colors duration-300"
                    style={{ color: isHovered ? service.color : 'rgba(255,255,255,0.12)' }}
                >
                    {service.tag}
                </span>

                {/* Icon */}
                <motion.div
                    className="flex-shrink-0 w-11 h-11 rounded-xl border items-center justify-center transition-all duration-300 hidden md:flex"
                    animate={{
                        borderColor: isHovered ? service.color.replace('0.9', '0.35') : 'rgba(255,255,255,0.10)',
                        backgroundColor: isHovered ? service.color.replace('0.9', '0.10') : 'rgba(255,255,255,0.03)',
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Icon
                        size={18}
                        style={{ color: isHovered ? service.color : 'rgba(255,255,255,0.35)', transition: 'color 0.3s' }}
                    />
                </motion.div>

                {/* Title */}
                <h3
                    className="font-outfit font-bold text-lg md:text-2xl flex-1 leading-snug transition-colors duration-300 min-w-0"
                    style={{ color: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.60)' }}
                >
                    {service.title}
                </h3>

                {/* Description — always rendered, opacity-only animation, no layout shift */}
                <div className="hidden lg:block w-72 xl:w-96 flex-shrink-0">
                    <p
                        className="font-inter text-sm leading-relaxed transition-all duration-350"
                        style={{
                            color: 'rgba(255,255,255,0.55)',
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0px)' : 'translateY(5px)',
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                    >
                        {service.desc}
                    </p>
                </div>

                {/* Arrow */}
                <motion.div
                    className="flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center"
                    animate={{
                        borderColor: isHovered ? service.color.replace('0.9', '0.4') : 'rgba(255,255,255,0.10)',
                        backgroundColor: isHovered ? service.color.replace('0.9', '0.12') : 'transparent',
                        rotate: isHovered ? 0 : 45,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowUpRight
                        size={14}
                        style={{ color: isHovered ? service.color : 'rgba(255,255,255,0.25)', transition: 'color 0.3s' }}
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}
