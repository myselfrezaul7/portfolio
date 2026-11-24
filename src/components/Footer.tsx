'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowUp, Command, MapPin, Search } from 'lucide-react';
import { openMailClient } from '@/utils/obfuscate';
import styles from './Footer.module.css';

const FALLBACK_YEAR = 2026;

function formatBerlinTime(date: Date): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    }).format(date);
  } catch {
    return 'CET';
  }
}

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(FALLBACK_YEAR);
  const [berlinClock, setBerlinClock] = useState<string>('');

  useEffect(() => {
    const syncClock = () => {
      const now = new Date();
      setCurrentYear(now.getFullYear());
      setBerlinClock(formatBerlinTime(now));
    };

    syncClock();
    const intervalId = setInterval(syncClock, 30_000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('portfolio:open-command-palette'));
  };

  const handleEmailClick = () => {
    openMailClient('Portfolio Inquiry - Md Rezaul Karim');
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.topRow}>
          {/* Brand Return-to-Top */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            className={styles.logo}
            aria-label="Scroll to top"
            whileTap={{ scale: 0.95 }}
          >
            <span>M•K</span>
            <ArrowUp size={14} className={styles.logoArrow} strokeWidth={2} aria-hidden="true" />
          </motion.button>

          {/* Live Germany Clock & Availability Pill */}
          <div className={styles.liveLocationPill}>
            <span className={styles.statusDot} aria-hidden="true" />
            <MapPin size={13} className={styles.pinIcon} aria-hidden="true" />
            <span className={styles.locationText}>Soest, Germany</span>
            <span className={styles.divider} aria-hidden="true">·</span>
            <span className={`${styles.clockText} font-mono`} suppressHydrationWarning>
              {berlinClock || 'CET/CEST'}
            </span>
          </div>

          {/* Actions: Command Palette + Socials (Zero SSR mailto:) */}
          <div className={styles.socialLinks}>
            <button
              type="button"
              onClick={openCommandPalette}
              className={`${styles.cmdButton} font-mono`}
              aria-label="Open quick search and command palette"
              title="Open Command Palette (⌘K)"
            >
              <Search size={17} className={styles.cmdSearchIcon} aria-hidden="true" />
              <span className={styles.cmdKeycap} aria-hidden="true">
                <Command size={13} />
                <span>K</span>
              </span>
            </button>

            <motion.a
              href="https://www.linkedin.com/in/myselfkarim"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.a>

            <motion.a
              href="https://github.com/myselfrezaul7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              aria-label="GitHub"
            >
              <Github size={18} />
            </motion.a>

            <motion.button
              type="button"
              onClick={handleEmailClick}
              className={styles.socialLink}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              aria-label="Open email client"
              title="Send Email"
            >
              <Mail size={18} />
            </motion.button>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.tagline}>
            Open to Working Student, Internship &amp; Master Thesis Roles · Selective Consulting
          </p>
          <p className={styles.copyright}>
            © {currentYear} Md Rezaul Karim
          </p>
        </div>
      </div>
    </footer>
  );
}
