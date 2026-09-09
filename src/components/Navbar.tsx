'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Detect scroll for showing logo and active section with rAF throttling
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 100);
                    ticking = false;
                });
                ticking = true;
            }
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

    // Keyboard focus trap and Escape key listener for mobile menu
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const previousActiveElement = document.activeElement as HTMLElement | null;
        const menuEl = mobileMenuRef.current;
        if (menuEl) {
            const focusableElements = menuEl.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                return;
            }

            if (e.key === 'Tab' && menuEl) {
                const focusable = menuEl.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            previousActiveElement?.focus();
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsMobileMenuOpen(false);

        if (href.startsWith('#')) {
            setActiveSection(href);
            if (pathname === '/') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    if (typeof window !== 'undefined') {
                        window.history.pushState(null, '', href);
                    }
                }
            }
        } else {
            setActiveSection('');
        }
    };

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            if (pathname !== '/') {
                router.push('/');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // Close mobile menu when viewport expands to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    {/* Scrolled Logo - appears on scroll as flex child */}
                    <AnimatePresence>
                        {isScrolled && (
                            <motion.button
                                layout
                                onClick={scrollToTop}
                                className={styles.scrolledLogo}
                                initial={{ opacity: 0, width: 0, scale: 0.8 }}
                                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                                exit={{ opacity: 0, width: 0, scale: 0.8 }}
                                transition={{ duration: 0.25 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Scroll to top"
                            >
                                M•K
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Desktop Navigation */}
                    <motion.div layout className={styles.desktopNav}>
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href;
                            const resolvedHref = link.href.startsWith('#') && pathname !== '/' ? `/${link.href}` : link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={resolvedHref}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNavIndicator"
                                            className={styles.activePill}
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className={styles.navLinkText}>{link.name}</span>
                                </Link>
                            );
                        })}
                    </motion.div>

                    {/* Desktop Actions */}
                    <div className={styles.desktopActions}>
                        <ThemeToggle />
                        <a href="/resume.pdf" download className={styles.resumeLink}>
                            <Download size={14} />
                            Resume
                        </a>
                        <a href="mailto:myselfrezaul@gmail.com" className={styles.ctaButton}>
                            Let&apos;s Talk
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
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-nav-menu"
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
                            id="mobile-nav-menu"
                            ref={mobileMenuRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={{ top: 0, bottom: 0.5 }}
                            dragSnapToOrigin
                            onDragEnd={(_e, info) => {
                                if (info.offset.y > 80 || info.velocity.y > 300) {
                                    setIsMobileMenuOpen(false);
                                }
                            }}
                        >
                            <div className={styles.dragHandleBar} aria-hidden="true" />
                            <div className={styles.mobileMenuContent}>
                                {navLinks.map((link, index) => {
                                    const isActive = activeSection === link.href;
                                    const resolvedHref = link.href.startsWith('#') && pathname !== '/' ? `/${link.href}` : link.href;
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <Link
                                                href={resolvedHref}
                                                onClick={(e) => handleNavClick(e, link.href)}
                                                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                                            >
                                                <span>{link.name}</span>
                                                {isActive && <span className={styles.mobileActiveDot} aria-hidden="true" />}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <div className={styles.mobileActionsMenu}>
                                <motion.a 
                                    href="/resume.pdf" 
                                    download 
                                    className={styles.mobileResumeLink} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Download size={18} />
                                    Download Resume
                                </motion.a>
                                <motion.a 
                                    href="mailto:myselfrezaul@gmail.com" 
                                    className={styles.mobileCta} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    Let&apos;s Talk
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
