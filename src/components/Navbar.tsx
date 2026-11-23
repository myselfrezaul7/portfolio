'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring, PanInfo } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight, Search, Command } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Competencies', href: '#services' },
  { name: 'Projects', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Blog', href: '/blog' },
];

const TRACKED_SECTIONS = [
  'hero',
  'services',
  'work',
  'process',
  'skills',
  'about',
  'blog',
  'contact',
] as const;

const SECTION_TO_NAV: Record<string, string> = {
  hero: '',
  services: '#services',
  work: '#work',
  process: '#work',
  skills: '#about',
  about: '#about',
  blog: '/blog',
  contact: '#contact',
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 38,
    restDelta: 0.0005,
  });

  // Scroll state & precision scroll-spy across all homepage sections
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    let rafId: number | null = null;
    let lastScrolled: boolean | null = null;
    let lastActive: string | null = null;

    const computeScrollSpy = () => {
      const nextScrolled = window.scrollY > 80;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      if (pathname !== '/') return;

      // Clear active pill cleanly when near the top / Hero
      if (window.scrollY < 140) {
        if (lastActive !== '') {
          lastActive = '';
          setActiveSection('');
        }
        return;
      }

      const probeY = window.innerHeight * 0.34;
      let matchedId: string = 'hero';

      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY * 0.5) {
          matchedId = id;
        }
      }

      // If scrolled to the very bottom of the page, always recognize #contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        if (document.getElementById('contact')) {
          matchedId = 'contact';
        }
      }

      const mapped = SECTION_TO_NAV[matchedId] ?? '';
      if (mapped !== lastActive) {
        lastActive = mapped;
        setActiveSection(mapped);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          computeScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    };

    // IntersectionObserver supplements scroll checks when layout shifts or jumps occur
    const observer =
      pathname === '/'
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                handleScroll();
              }
            },
            { rootMargin: '-22% 0px -55% 0px', threshold: 0 }
          )
        : null;

    if (observer) {
      TRACKED_SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  // Keyboard focus trap & Escape handler for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const menuEl = mobileMenuRef.current;

    const getFocusableElements = () => {
      const menuItems = menuEl
        ? Array.from(
            menuEl.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];
      const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-nav-menu"]');
      return toggle ? [toggle, ...menuItems] : menuItems;
    };

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 1) {
      focusableElements[1].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
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
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Body scroll lock when mobile menu is open
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      setActiveSection(href);
      if (pathname === '/') {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    } else if (href === '/blog' && pathname === '/') {
      // Allow direct navigation to /blog hub
      setActiveSection('/blog');
    }
  };

  const handleBrandClick = () => {
    setIsMobileMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openCommandPalette = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('portfolio:open-command-palette'));
  };

  const handleMobileDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -55 || info.velocity.y < -280 || info.offset.y > 95) {
      setIsMobileMenuOpen(false);
    }
  };

  const effectiveActive = pathname.startsWith('/blog')
    ? '/blog'
    : pathname === '/'
      ? activeSection
      : '';
  const contactHref = pathname === '/' ? '#contact' : '/#contact';

  return (
    <>
      {/* 2px Hairline Scroll Progress Bar */}
      <motion.div
        className={styles.scrollProgressBar}
        style={{ scaleX }}
        aria-hidden="true"
      />

      <nav className={styles.navbar} aria-label="Primary navigation">
        <div className={`${styles.navbarInner} ${isScrolled ? styles.navbarInnerScrolled : ''}`}>
          {/* Stabilized Fixed-Width M•K Monogram Slot (Zero horizontal layout shift) */}
          <div className={styles.brandSlot}>
            <button
              type="button"
              onClick={handleBrandClick}
              className={`${styles.brandLogo} ${isScrolled ? styles.brandLogoScrolled : ''}`}
              aria-label={pathname === '/' ? 'Scroll to top' : 'Go to home page'}
            >
              <span>M</span>
              <span className={styles.brandDot} aria-hidden="true">•</span>
              <span>K</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = effectiveActive === link.href;
              const resolvedHref =
                link.href.startsWith('#') && pathname !== '/' ? `/${link.href}` : link.href;
              return (
                <Link
                  key={link.name}
                  href={resolvedHref}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={styles.activePill}
                      transition={{ type: 'spring', stiffness: 500, damping: 36, mass: 0.8 }}
                    />
                  )}
                  <span className={styles.navLinkText}>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <button
              type="button"
              onClick={openCommandPalette}
              className={`${styles.cmdTrigger} font-mono`}
              aria-label="Open command palette (Command or Control plus K)"
              title="Command Palette (⌘K)"
            >
              <Command size={12} aria-hidden="true" />
              <span>K</span>
            </button>

            <ThemeToggle />

            <a href="/resume.pdf" download className={styles.resumeLink}>
              <Download size={14} aria-hidden="true" />
              <span>Resume</span>
            </a>

            <Link
              href={contactHref}
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`${styles.ctaButton} ${effectiveActive === '#contact' ? styles.ctaButtonActive : ''}`}
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            <button
              type="button"
              onClick={openCommandPalette}
              className={styles.mobileIconBtn}
              aria-label="Open quick search and command palette"
            >
              <Search size={19} aria-hidden="true" />
            </button>
            <ThemeToggle />
            <motion.button
              type="button"
              className={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              whileTap={{ scale: 0.92 }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu & Backdrop with Real Swipe-to-Dismiss */}
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
              drag="y"
              dragConstraints={{ top: -140, bottom: 24 }}
              dragElastic={{ top: 0.25, bottom: 0.18 }}
              onDragEnd={handleMobileDragEnd}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.dragHandleBar} aria-hidden="true" />
              <div className={styles.mobileMenuContent}>
                {navLinks.map((link, index) => {
                  const isActive = effectiveActive === link.href;
                  const resolvedHref =
                    link.href.startsWith('#') && pathname !== '/' ? `/${link.href}` : link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
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
                  <button
                    type="button"
                    onClick={openCommandPalette}
                    className={styles.mobileResumeLink}
                  >
                    <Search size={16} aria-hidden="true" />
                    <span>Quick Search (⌘K)</span>
                  </button>

                  <a
                    href="/resume.pdf"
                    download
                    className={styles.mobileResumeLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Download size={16} aria-hidden="true" />
                    <span>Download Resume</span>
                  </a>

                  <Link
                    href={contactHref}
                    className={styles.mobileCta}
                    onClick={(e) => handleNavClick(e, '#contact')}
                  >
                    <span>Let&apos;s Talk</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
