'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Calendar, ExternalLink, Video, Clock, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './CalBookingModal.module.css';

export const CAL_BOOKING_URL = 'https://cal.eu/myself-karim/30min';
export const CAL_EMBED_URL = 'https://app.eu.cal.com/myself-karim/30min';

export interface CalBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    contextLabel?: string;
}

export default function CalBookingModal({
    isOpen,
    onClose,
    contextLabel,
}: CalBookingModalProps) {
    const { theme } = useTheme();
    const shouldReduceMotion = useReducedMotion();
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const openerRef = useRef<HTMLElement | null>(null);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const iframeUrl = `${CAL_EMBED_URL}?embed=true&layout=month_view&theme=${theme}`;
    const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
    const [slowUrl, setSlowUrl] = useState<string | null>(null);

    const isIframeLoading = loadedUrl !== iframeUrl;
    const showFallbackHint = isIframeLoading && slowUrl === iframeUrl;

    // Manage Escape key, scroll lock, focus restoration, and load-state reset on close
    useEffect(() => {
        if (!isOpen) return;

        openerRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const focusFrame = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onCloseRef.current();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            openerRef.current?.focus();
            setLoadedUrl(null);
            setSlowUrl(null);
        };
    }, [isOpen]);

    // Show gentle external fallback hint if embed takes longer than 7s
    useEffect(() => {
        if (!isOpen || !isIframeLoading) return;

        const timer = window.setTimeout(() => {
            setSlowUrl(iframeUrl);
        }, 7000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isOpen, isIframeLoading, iframeUrl]);

    if (typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    role="presentation"
                >
                    <motion.div
                        className={styles.dialog}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cal-booking-modal-title"
                        aria-describedby="cal-booking-modal-subtitle"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className={styles.header}>
                            <div className={styles.headerLeft}>
                                <div className={styles.iconWrap} aria-hidden="true">
                                    <Calendar size={18} />
                                </div>
                                <div className={styles.titleBlock}>
                                    <div className={styles.titleRow}>
                                        <h2 id="cal-booking-modal-title" className={styles.title}>
                                            Schedule a 30-Min Intro Call
                                        </h2>
                                        {contextLabel && (
                                            <span className={styles.contextPill}>{contextLabel}</span>
                                        )}
                                    </div>
                                    <p id="cal-booking-modal-subtitle" className={styles.subtitle}>
                                        <span className={styles.subtitleMeta}>
                                            <Video size={13} aria-hidden="true" />
                                            Google Meet
                                        </span>
                                        <span className={styles.dot} aria-hidden="true">·</span>
                                        <span className={styles.subtitleMeta}>
                                            <Clock size={13} aria-hidden="true" />
                                            30 min · Soest, Germany (CET/CEST)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.headerActions}>
                                <a
                                    href={CAL_BOOKING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.externalLink}
                                >
                                    <span>Open in new tab</span>
                                    <ExternalLink size={14} aria-hidden="true" />
                                </a>
                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    onClick={onClose}
                                    className={styles.closeBtn}
                                    aria-label="Close booking dialog"
                                >
                                    <X size={18} aria-hidden="true" />
                                </button>
                            </div>
                        </header>

                        <div className={styles.frameContainer}>
                            {isIframeLoading && (
                                <div className={styles.skeleton} aria-live="polite">
                                    <div className={styles.skeletonGrid}>
                                        <div className={styles.skeletonSidebar}>
                                            <div className={`${styles.shimmer} ${styles.skAvatar}`} />
                                            <div className={`${styles.shimmer} ${styles.skLineShort}`} />
                                            <div className={`${styles.shimmer} ${styles.skLineWide}`} />
                                            <div className={`${styles.shimmer} ${styles.skLineMed}`} />
                                        </div>
                                        <div className={styles.skeletonCalendar}>
                                            <div className={`${styles.shimmer} ${styles.skCalHeader}`} />
                                            <div className={styles.skDays}>
                                                {Array.from({ length: 21 }).map((_, index) => (
                                                    <div key={index} className={`${styles.shimmer} ${styles.skDay}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.skeletonStatus}>
                                        <span>Loading live availability from Cal.eu...</span>
                                        {showFallbackHint && (
                                            <a
                                                href={CAL_BOOKING_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.fallbackInlineLink}
                                            >
                                                Taking a moment? Open directly in a new tab ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            <iframe
                                src={iframeUrl}
                                title="Schedule a 30-minute call with Md Rezaul Karim via Cal.eu"
                                className={`${styles.iframe} ${isIframeLoading ? styles.iframeHidden : styles.iframeVisible}`}
                                loading="eager"
                                referrerPolicy="strict-origin-when-cross-origin"
                                onLoad={() => setLoadedUrl(iframeUrl)}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
