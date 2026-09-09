'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            className={styles.toggle}
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            suppressHydrationWarning
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                    <motion.div
                        key="sun"
                        className={styles.sunIcon}
                        initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                    >
                        <Sun size={18} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        className={styles.moonIcon}
                        initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                    >
                        <Moon size={18} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
