'use client';

import {
    useState,
    useRef,
    useEffect,
    useSyncExternalStore,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Calendar,
    Mail,
    Check,
    Copy,
    Linkedin,
    Github,
    MapPin,
    Clock,
    ArrowUpRight,
} from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import CalBookingModal, { CAL_BOOKING_URL } from './CalBookingModal';
import {
    getEmailAddress,
    getObfuscatedEmailLabel,
    openMailClient,
} from '@/utils/obfuscate';
import { copyTextToClipboard } from '@/utils/blogUtils';
import styles from './Contact.module.css';

const AVAILABILITY_ROLES = [
    'Working Student',
    'Internship',
    'Master Thesis',
    'Selective Consulting',
] as const;

// Module-level live Berlin clock store for hydration-safe useSyncExternalStore
let currentBerlinClock = '';
const clockListeners = new Set<() => void>();
let clockInterval: number | null = null;

function computeBerlinTime(): string {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(now);

    const rawTz =
        new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Berlin',
            timeZoneName: 'short',
        })
            .formatToParts(now)
            .find((part) => part.type === 'timeZoneName')?.value ?? 'CET';

    const tzLabel =
        rawTz === 'CET' || rawTz === 'CEST'
            ? rawTz
            : rawTz.includes('+2')
                ? 'CEST'
                : 'CET';

    return `${time} ${tzLabel}`;
}

function subscribeBerlinClock(listener: () => void): () => void {
    clockListeners.add(listener);
    if (typeof window !== 'undefined' && clockInterval === null) {
        currentBerlinClock = computeBerlinTime();
        clockInterval = window.setInterval(() => {
            const next = computeBerlinTime();
            if (next !== currentBerlinClock) {
                currentBerlinClock = next;
                clockListeners.forEach((cb) => cb());
            }
        }, 30_000);
    }

    return () => {
        clockListeners.delete(listener);
        if (clockListeners.size === 0 && clockInterval !== null) {
            window.clearInterval(clockInterval);
            clockInterval = null;
        }
    };
}

function getBerlinClockSnapshot(): string {
    if (!currentBerlinClock && typeof window !== 'undefined') {
        currentBerlinClock = computeBerlinTime();
    }
    return currentBerlinClock;
}

function getServerBerlinClockSnapshot(): string {
    return '';
}

const subscribeNoop = () => () => {};
function getHydratedClient(): boolean {
    return true;
}
function getHydratedServer(): boolean {
    return false;
}

export default function Contact() {
    const shouldReduceMotion = useReducedMotion();
    const isHydrated = useSyncExternalStore(
        subscribeNoop,
        getHydratedClient,
        getHydratedServer
    );
    const liveGermanyTime = useSyncExternalStore(
        subscribeBerlinClock,
        getBerlinClockSnapshot,
        getServerBerlinClockSnapshot
    );

    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [liveAnnouncement, setLiveAnnouncement] = useState('');
    const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Listen to global portfolio:open-booking event (from Hero, Navbar, CommandPalette, etc.)
    useEffect(() => {
        const handleOpenBooking = () => setIsBookingOpen(true);
        window.addEventListener('portfolio:open-booking', handleOpenBooking);
        return () => window.removeEventListener('portfolio:open-booking', handleOpenBooking);
    }, []);

    useEffect(() => {
        return () => {
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        };
    }, []);

    // Email display stays obfuscated during SSR HTML generation and hydrates client-side only
    const displayedEmail = isHydrated ? getEmailAddress() : getObfuscatedEmailLabel();

    const handleCopyEmail = async () => {
        const email = getEmailAddress();
        const ok = await copyTextToClipboard(email);
        if (ok) {
            setCopiedEmail(true);
            setLiveAnnouncement('Email address copied to clipboard.');
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
            copyTimerRef.current = setTimeout(() => {
                setCopiedEmail(false);
                setLiveAnnouncement('');
            }, 2400);
        }
    };

    const handleSendEmail = () => {
        openMailClient('Portfolio Inquiry - Md Rezaul Karim');
    };

    return (
        <section id="contact" className={styles.contact} aria-label="Contact and scheduling">
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.hubCard}>
                        <div className={styles.cardGradientMesh} aria-hidden="true" />

                        {/* Live Germany Availability Header */}
                        <div className={styles.availabilityHeader}>
                            <div className={styles.liveStatusPill}>
                                <span className={styles.pillPulseDot} aria-hidden="true" />
                                <span className={styles.liveLocation}>
                                    <MapPin size={13} aria-hidden="true" />
                                    <span>Soest, Germany</span>
                                </span>
                                <span className={styles.statusDivider} aria-hidden="true">·</span>
                                <span className={styles.liveClock}>
                                    <Clock size={13} aria-hidden="true" />
                                    <span>{liveGermanyTime || 'CET/CEST'}</span>
                                </span>
                                <span
                                    className={`${styles.statusDivider} ${styles.slaDivider}`}
                                    aria-hidden="true"
                                >
                                    ·
                                </span>
                                <span className={styles.replySla}>Typical reply &lt; 24h</span>
                            </div>

                            <div className={styles.rolePills} aria-label="Open role categories">
                                {AVAILABILITY_ROLES.map((role) => (
                                    <span key={role} className={styles.rolePill}>
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Balanced Two-Column Contact Grid */}
                        <div className={styles.hubGrid}>
                            {/* Left Column: Narrative & Primary Actions */}
                            <div className={styles.conciergeCol}>
                                <span className={styles.eyebrow}>Direct Contact</span>
                                <h2 className={styles.title}>Let&apos;s Connect</h2>
                                <p className={styles.description}>
                                    Seeking Working Student (Werkstudent), Internship, Master Thesis, and selective consulting collaborations in Data Analytics, SAP BI, Supply Chain Operations, and IT Project Management across Germany.
                                </p>

                                {/* Primary CTA Pair */}
                                <div className={styles.primaryActions}>
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsBookingOpen(true)}
                                        className={styles.bookCallBtn}
                                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                                    >
                                        <Calendar size={17} strokeWidth={1.9} aria-hidden="true" />
                                        <span>Schedule a 30-Min Call</span>
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={handleSendEmail}
                                        className={styles.sendEmailBtn}
                                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                                    >
                                        <Mail size={16} strokeWidth={1.9} aria-hidden="true" />
                                        <span>Send Email</span>
                                    </motion.button>
                                </div>

                                <p className={styles.bookingNote}>
                                    Prefer a new browser tab?{' '}
                                    <a
                                        href={CAL_BOOKING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open Cal.eu directly ↗
                                    </a>
                                </p>
                            </div>

                            {/* Right Column: Elevated Direct Channels Surface Card */}
                            <div className={styles.directChannelBox}>
                                <div className={styles.emailStrip}>
                                    <span className={styles.emailLabel}>Direct Email</span>
                                    <div className={styles.emailRow}>
                                        <code className={styles.emailValue}>{displayedEmail}</code>
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className={`${styles.copyInlineBtn} ${copiedEmail ? styles.copyInlineBtnDone : ''}`}
                                            aria-label="Copy email address"
                                        >
                                            {copiedEmail ? (
                                                <>
                                                    <Check size={14} className={styles.copiedIcon} aria-hidden="true" />
                                                    <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} aria-hidden="true" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.quickActionsGrid}>
                                    <a
                                        href="https://www.linkedin.com/in/myselfkarim"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.quickActionBtn}
                                    >
                                        <Linkedin size={15} aria-hidden="true" />
                                        <span>LinkedIn</span>
                                        <ArrowUpRight size={13} className={styles.externalMini} aria-hidden="true" />
                                    </a>

                                    <a
                                        href="https://github.com/myselfrezaul7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.quickActionBtn}
                                    >
                                        <Github size={15} aria-hidden="true" />
                                        <span>GitHub</span>
                                        <ArrowUpRight size={13} className={styles.externalMini} aria-hidden="true" />
                                    </a>
                                </div>

                                <p className={styles.cvRequestNote}>
                                    Full CV available upon request.
                                </p>
                            </div>
                        </div>

                        <div className="sr-only" role="status" aria-live="polite">
                            {liveAnnouncement}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <CalBookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
}
