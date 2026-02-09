'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#work' },
    { name: 'About', href: '#about' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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

    return (
        <>
            <motion.nav
                className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
                <div className={styles.container}>
                    {/* Logo */}
                    <a href="#" className={styles.logo}>
                        M—K
                    </a>

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
                        <a
                            href="/resume.pdf"
                            download
                            className={styles.resumeLink}
                        >
                            <Download size={16} />
                            Resume
                        </a>
                        <a
                            href="mailto:myselfrezaul@gmail.com"
                            className={styles.ctaButton}
                        >
                            <Mail size={16} />
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
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
                                    <Mail size={18} />
                                    Let's Talk
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
