'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 30,
    });

    useEffect(() => {
        let ticking = false;
        let rafId: number | null = null;

        const toggleVisibility = () => {
            if (!ticking) {
                rafId = window.requestAnimationFrame(() => {
                    setIsVisible(window.scrollY > 300);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Check initial scroll state on mount via rAF
        toggleVisibility();

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    className={styles.scrollToTop}
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Scroll to top"
                >
                    <svg
                        className={styles.progressRing}
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="21"
                            className={styles.progressRingBg}
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="21"
                            className={styles.progressRingIndicator}
                            style={{ pathLength: smoothProgress }}
                        />
                    </svg>
                    <span className={styles.iconWrapper}>
                        <ArrowUp size={20} />
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
