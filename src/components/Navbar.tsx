'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#work' },
    { name: 'Blog', href: '#blog' },
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
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
                            >
                                M—K
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
                        <a
                            href="/resume.pdf"
                            download
                            className={styles.resumeLink}
                        >
                            Resume
                            <Download size={14} />
                        </a>
                        <ThemeToggle />
                        <a
                            href="mailto:myselfrezaul@gmail.com"
                            className={styles.ctaButton}
                        >
                            Let's Talk
                            <ArrowUpRight size={14} />
                        </a>
                    </div>

                    {/* Mobile Actions */}
                    <div className={styles.mobileActions}>
                        <ThemeToggle />
                        <button
                            className={styles.mobileMenuToggle}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
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
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                            <div className={styles.mobileActionsMenu}>
                                <a href="/resume.pdf" download className={styles.mobileResumeLink}>
                                    <Download size={18} />
                                    Download Resume
                                </a>
                                <a href="mailto:myselfrezaul@gmail.com" className={styles.mobileCta}>
                                    Let's Talk
                                    <ArrowUpRight size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
