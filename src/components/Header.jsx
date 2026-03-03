import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Posters', href: '#posters' },
    { label: 'Reels', href: '#reels' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-500 ${scrolled
                ? 'bg-black/60 backdrop-blur-xl border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center group">
                    <img
                        src="/logo.png"
                        alt="True Up Media"
                        className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
                        style={{ mixBlendMode: 'screen' }}
                    />
                </a>


                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="font-inter text-sm text-muted hover:text-white transition-colors duration-200 tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <a
                    href="#contact"
                    className="hidden md:inline-flex items-center gap-2 bg-lime text-black font-outfit font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
                >
                    Get Started →
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white p-2"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-inter text-white text-lg hover:text-lime transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="mt-2 bg-lime text-black font-outfit font-bold text-sm px-5 py-3 rounded-full text-center"
                            >
                                Get Started →
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
