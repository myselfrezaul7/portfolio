'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#work' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '#about' },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll for showing logo
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
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
                    {/* Scrolled Logo - appears on scroll */}
                    <AnimatePresence>
                        {isScrolled && (
                            <motion.button
                                onClick={scrollToTop}
                                className={styles.scrolledLogo}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
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
                                className={styles.navLink}
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

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
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
                )}
            </AnimatePresence>
        </>
    );
}
