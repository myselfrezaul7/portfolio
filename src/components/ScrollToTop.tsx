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
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
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
