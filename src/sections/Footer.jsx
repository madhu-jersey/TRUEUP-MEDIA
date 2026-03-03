import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Linkedin } from 'lucide-react'

const QUICK_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Why Us', href: '#whyus' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
    { icon: Instagram, href: 'https://www.instagram.com/trueupmedia/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/trueup-media/', label: 'LinkedIn' },
]

export default function Footer() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <footer
            ref={ref}
            className="relative overflow-hidden bg-charcoal"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
            {/* Ambient purple glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 50% 60% at 15% 80%, rgba(180,255,0,0.04) 0%, transparent 65%)',
                }}
            />

            {/* ── Main footer content ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8"
                >

                    {/* ─── Column 1: Branding + Contact ─── */}
                    <div className="flex flex-col gap-7">
                        {/* Logo */}
                        <div>
                            <a href="#" className="inline-block">
                                <img
                                    src="/logo.png"
                                    alt="True Up Media"
                                    className="h-14 w-auto object-contain"
                                    style={{ mixBlendMode: 'screen' }}
                                />
                            </a>
                        </div>


                        <p className="font-inter text-white/40 text-sm leading-relaxed max-w-xs">
                            Turning ambitious brands into dominant forces. Strategy, content, and performance — all under one roof.
                        </p>

                        {/* Contact details */}
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:hr@vishnuspire.com"
                                className="group flex items-center gap-3 text-white/55 hover:text-lime transition-all duration-300 w-fit"
                            >
                                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-lime/30 group-hover:bg-lime/8 transition-all duration-300">
                                    <Mail size={13} />
                                </span>
                                <span
                                    className="font-inter text-sm group-hover:[text-shadow:0_0_16px_rgba(165,206,64,0.55)] transition-all duration-300"
                                >
                                    hr@vishnuspire.com
                                </span>
                            </a>

                            <a
                                href="tel:+919110788933"
                                className="group flex items-center gap-3 text-white/55 hover:text-lime transition-all duration-300 w-fit"
                            >
                                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-lime/30 group-hover:bg-lime/8 transition-all duration-300">
                                    <Phone size={13} />
                                </span>
                                <span
                                    className="font-inter text-sm group-hover:[text-shadow:0_0_16px_rgba(165,206,64,0.55)] transition-all duration-300"
                                >
                                    +91 91107 88933
                                </span>
                            </a>

                            <a
                                href="tel:+919515893777"
                                className="group flex items-center gap-3 text-white/55 hover:text-lime transition-all duration-300 w-fit"
                            >
                                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-lime/30 group-hover:bg-lime/8 transition-all duration-300">
                                    <Phone size={13} />
                                </span>
                                <span
                                    className="font-inter text-sm group-hover:[text-shadow:0_0_16px_rgba(165,206,64,0.55)] transition-all duration-300"
                                >
                                    +91 95158 93777
                                </span>
                            </a>

                            <div className="flex items-start gap-3 text-white/40">
                                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin size={13} />
                                </span>
                                <span className="font-inter text-sm leading-relaxed">
                                    Bhimavaram, West Godavari<br />
                                    Andhra Pradesh, India
                                </span>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40
                    hover:text-lime hover:border-lime/30 hover:bg-lime/8 transition-all duration-300"
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ─── Column 2: Quick Links ─── */}
                    <div>
                        <h3 className="font-outfit font-bold text-white/80 text-sm tracking-widest uppercase mb-6">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {QUICK_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="group flex items-center gap-2 font-inter text-white/45 hover:text-white text-sm transition-colors duration-250 w-fit"
                                    >
                                        <span className="w-3 h-px bg-white/20 group-hover:w-4 group-hover:bg-lime transition-all duration-300" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ─── Column 3: Join Us / CTA ─── */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h3 className="font-outfit font-bold text-white/80 text-sm tracking-widest uppercase mb-3">
                                Start Growing
                            </h3>
                            <p className="font-inter text-white/40 text-sm leading-relaxed">
                                Ready to scale your brand? Let's build something extraordinary together.
                            </p>
                        </div>

                        {/* Glassmorphism CTA */}
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl overflow-hidden transition-all duration-400 w-fit"
                            style={{
                                background: 'rgba(165,206,64,0.10)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(165,206,64,0.25)',
                                boxShadow: '0 0 0 0 rgba(165,206,64,0)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 28px rgba(165,206,64,0.2)'
                                e.currentTarget.style.background = 'rgba(165,206,64,0.16)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(165,206,64,0)'
                                e.currentTarget.style.background = 'rgba(165,206,64,0.10)'
                            }}
                        >
                            <span className="font-outfit font-bold text-lime text-sm">Get Started</span>
                            <ArrowUpRight
                                size={16}
                                className="text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                            />
                        </a>

                        {/* Register teaser */}
                        <div
                            className="p-5 rounded-2xl border border-white/8"
                            style={{ background: 'rgba(255,255,255,0.025)' }}
                        >
                            <p className="font-inter text-white/40 text-xs leading-relaxed mb-3">
                                Looking to join our team? We're always on the lookout for driven creatives and strategists.
                            </p>
                            <a
                                href="mailto:hr@vishnuspire.com"
                                className="font-inter text-lime text-xs hover:underline underline-offset-2 transition-colors"
                            >
                                hr@vishnuspire.com →
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* ── Bottom bar ── */}
                <div
                    className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <p className="font-inter text-white/25 text-xs">
                        © {new Date().getFullYear()} True Up Media. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        {['Privacy Policy', 'Terms of Service'].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="font-inter text-white/25 text-xs hover:text-white/50 transition-colors duration-200"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
