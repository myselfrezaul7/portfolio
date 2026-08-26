'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
    { name: 'Competencies', href: '#services' },
    { name: 'Projects', href: '#work' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '#about' },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    // Detect scroll for showing logo and active section
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // IntersectionObserver for ScrollSpy
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const sectionIds = ['services', 'work', 'skills', 'about', 'contact'];
        const sectionMap: Record<string, string> = {
            services: '#services',
            work: '#work',
            skills: '#skills',
            about: '#about',
            contact: '#contact',
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const matchedHref = sectionMap[entry.target.id];
                        if (matchedHref) {
                            setActiveSection(matchedHref);
                        }
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Escape key listener for mobile menu
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        setActiveSection(href);
        if (href.startsWith('#')) {
            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
                window.location.href = `/${href}`;
            } else {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    if (typeof window !== 'undefined') {
                        window.history.pushState(null, '', href);
                    }
                }
            }
        } else {
            if (typeof window !== 'undefined') {
                window.location.href = href;
            }
        }
    };

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                className={styles.navbar}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
                <div className={styles.navbarInner}>
                    {/* Scrolled Logo - appears on scroll without layout shift */}
                    <AnimatePresence>
                        {isScrolled && (
                            <motion.button
                                onClick={scrollToTop}
                                className={styles.scrolledLogo}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Scroll to top"
                            >
                                M•K
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Desktop Navigation */}
                    <div className={styles.desktopNav}>
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className={`${styles.navLink} ${activeSection === link.href ? styles.navLinkActive : ''}`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className={styles.desktopActions}>
                        <ThemeToggle />
                        <a href="/resume.pdf" download className={styles.resumeLink}>
                            <Download size={14} />
                            Resume
                        </a>
                        <a href="mailto:myselfrezaul@gmail.com" className={styles.ctaButton}>
                            Let's Talk
                            <ArrowUpRight size={14} />
                        </a>
                    </div>

                    {/* Mobile Actions */}
                    <div className={styles.mobileActions}>
                        <ThemeToggle />
                        <motion.button
                            className={styles.mobileMenuToggle}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu & Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className={styles.mobileBackdrop}
                            onClick={() => setIsMobileMenuOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            aria-hidden="true"
                        />
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.mobileMenuContent}>
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className={styles.mobileNavLink}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                                <div className={styles.mobileActionsMenu}>
                                <motion.a href="/resume.pdf" download className={styles.mobileResumeLink} whileTap={{ scale: 0.96 }}>
                                    <Download size={18} />
                                    Download Resume
                                </motion.a>
                                <motion.a href="mailto:myselfrezaul@gmail.com" className={styles.mobileCta} whileTap={{ scale: 0.96 }}>
                                    Let's Talk
                                    <ArrowUpRight size={18} />
                                </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
