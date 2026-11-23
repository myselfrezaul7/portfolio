'use client';

import {
    useState,
    useRef,
    useEffect,
    useMemo,
    useSyncExternalStore,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Calendar,
    Mail,
    Check,
    Copy,
    Linkedin,
    FileText,
    Download,
    MapPin,
    Clock,
    Sparkles,
    ArrowUpRight,
    Send,
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

type IntentKey = 'working-student' | 'master-thesis' | 'process-bi' | 'general';

interface IntentConfig {
    key: IntentKey;
    label: string;
    shortLabel: string;
    subject: string;
    placeholder: string;
    defaultIntro: string;
}

const INTENTS: readonly IntentConfig[] = [
    {
        key: 'working-student',
        label: 'Working Student / Internship',
        shortLabel: 'Werkstudent / Intern',
        subject: 'Working Student / Internship Opportunity — Md Rezaul Karim',
        placeholder: 'Team, location (remote / hybrid in Germany), start date, or role focus...',
        defaultIntro:
            'We are exploring Working Student / Internship candidates in Data Analytics, Supply Chain Operations, or IT Project Management and would like to connect.',
    },
    {
        key: 'master-thesis',
        label: 'Master Thesis',
        shortLabel: 'Master Thesis',
        subject: 'Master Thesis Collaboration — IMIS (FH Südwestfalen)',
        placeholder: 'Department, thesis topic area (SAP BI, BPMN, Supply Chain, Digital Ops), or timeline...',
        defaultIntro:
            'We would like to discuss a practice-oriented Master Thesis collaboration in Business Intelligence, Process Management, or Digital Operations.',
    },
    {
        key: 'process-bi',
        label: 'Process & BI Project',
        shortLabel: 'Process & BI Project',
        subject: 'Process Architecture & BI Project Inquiry',
        placeholder: 'Brief scope: BPMN workflow mapping, reporting dashboard, web app, or advisory...',
        defaultIntro:
            'We have a workflow, analytics, or digital operations initiative and would love to discuss how your process-and-systems approach could help.',
    },
    {
        key: 'general',
        label: 'General Hello',
        shortLabel: 'General Hello',
        subject: 'Hello from your portfolio — Connecting with Md Rezaul Karim',
        placeholder: 'What caught your eye (a case study, essay, or shared interest in IMIS / ops)...',
        defaultIntro:
            'I came across your portfolio and writing and wanted to reach out for a brief introductory chat.',
    },
];

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
    const [selectedIntent, setSelectedIntent] = useState<IntentKey>('working-student');
    const [senderName, setSenderName] = useState('');
    const [contextNote, setContextNote] = useState('');
    const [copiedTarget, setCopiedTarget] = useState<'email' | 'bundle' | null>(null);
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

    const activeIntent = useMemo(
        () => INTENTS.find((item) => item.key === selectedIntent) ?? INTENTS[0],
        [selectedIntent]
    );

    const assembledMessage = useMemo(() => {
        const trimmedName = senderName.trim();
        const trimmedContext = contextNote.trim();
        const subject = trimmedName
            ? `${activeIntent.subject} (${trimmedName})`
            : activeIntent.subject;

        const greeting = 'Hi Rezaul,';
        const introLine = trimmedContext ? trimmedContext : activeIntent.defaultIntro;
        const closing = trimmedName ? `Best regards,\n${trimmedName}` : 'Best regards,';
        const body = `${greeting}\n\n${introLine}\n\nWould you be available for a quick 30-minute call this week or next?\n\n${closing}`;

        return { subject, body };
    }, [activeIntent, senderName, contextNote]);

    // Email display stays obfuscated during SSR HTML generation and hydrates client-side only
    const displayedEmail = isHydrated ? getEmailAddress() : getObfuscatedEmailLabel();

    const triggerCopyFeedback = (target: 'email' | 'bundle', announcement: string) => {
        setCopiedTarget(target);
        setLiveAnnouncement(announcement);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => {
            setCopiedTarget(null);
            setLiveAnnouncement('');
        }, 2400);
    };

    const handleCopyEmail = async () => {
        const email = getEmailAddress();
        const ok = await copyTextToClipboard(email);
        if (ok) {
            triggerCopyFeedback('email', 'Email address copied to clipboard.');
        }
    };

    const handleCopyMessageAndEmail = async () => {
        const email = getEmailAddress();
        const bundle = `To: ${email}\nSubject: ${assembledMessage.subject}\n\n${assembledMessage.body}`;
        const ok = await copyTextToClipboard(bundle);
        if (ok) {
            triggerCopyFeedback(
                'bundle',
                'Recipient email and pre-formatted message copied to clipboard.'
            );
        }
    };

    const handleOpenEmailApp = () => {
        openMailClient(assembledMessage.subject, assembledMessage.body);
    };

    const handlePreviewCv = () => {
        window.dispatchEvent(new CustomEvent('portfolio:open-cv'));
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
                                <span className={styles.statusDivider} aria-hidden="true">·</span>
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

                        {/* Two-Column Executive Concierge Grid */}
                        <div className={styles.hubGrid}>
                            {/* Left Column: Direct Actions & Credentials */}
                            <div className={styles.conciergeCol}>
                                <span className={styles.eyebrow}>Concierge Contact Hub</span>
                                <h2 className={styles.title}>Let&apos;s Connect</h2>
                                <p className={styles.description}>
                                    Seeking Working Student (Werkstudent), Internship, Master Thesis, and selective consulting collaborations in Data Analytics, SAP BI, Supply Chain Operations, and IT Project Management across Germany.
                                </p>

                                {/* Primary In-Page Booking Trigger */}
                                <motion.button
                                    type="button"
                                    onClick={() => setIsBookingOpen(true)}
                                    className={styles.bookCallBtn}
                                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                                >
                                    <Calendar size={18} strokeWidth={1.9} aria-hidden="true" />
                                    <span>Schedule a 30-Min Call</span>
                                    <span className={styles.bookCallBadge}>In-Page</span>
                                </motion.button>

                                {/* Direct Email Display + Quick Actions */}
                                <div className={styles.directChannelBox}>
                                    <div className={styles.emailStrip}>
                                        <span className={styles.emailLabel}>Direct Email</span>
                                        <code className={styles.emailValue}>{displayedEmail}</code>
                                    </div>

                                    <div className={styles.quickActionsGrid}>
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className={styles.quickActionBtn}
                                            aria-label="Copy email address"
                                        >
                                            {copiedTarget === 'email' ? (
                                                <>
                                                    <Check size={15} className={styles.copiedIcon} aria-hidden="true" />
                                                    <span>Copied Email!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={15} aria-hidden="true" />
                                                    <span>Copy Email</span>
                                                </>
                                            )}
                                        </button>

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

                                        <button
                                            type="button"
                                            onClick={handlePreviewCv}
                                            className={styles.quickActionBtn}
                                        >
                                            <FileText size={15} aria-hidden="true" />
                                            <span>Preview CV</span>
                                        </button>

                                        <a
                                            href="/resume.pdf"
                                            download
                                            className={styles.quickActionBtn}
                                        >
                                            <Download size={15} aria-hidden="true" />
                                            <span>Download CV</span>
                                        </a>
                                    </div>
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

                            {/* Right Column: Role-Guided Quick-Connect Composer */}
                            <div className={styles.composerCol}>
                                <div className={styles.composerHeader}>
                                    <div className={styles.composerTitleRow}>
                                        <Sparkles size={15} className={styles.composerIcon} aria-hidden="true" />
                                        <h3 className={styles.composerTitle}>Role-Guided Quick Composer</h3>
                                    </div>
                                    <span className={styles.composerHint}>
                                        Pick an intent to pre-draft a crisp intro — zero backend forms.
                                    </span>
                                </div>

                                {/* 4 One-Tap Intent Pills */}
                                <div
                                    className={styles.intentPills}
                                    role="group"
                                    aria-label="Select conversation intent"
                                >
                                    {INTENTS.map((intent) => {
                                        const isActive = intent.key === selectedIntent;
                                        return (
                                            <button
                                                key={intent.key}
                                                type="button"
                                                aria-pressed={isActive}
                                                onClick={() => setSelectedIntent(intent.key)}
                                                className={`${styles.intentPill} ${isActive ? styles.intentPillActive : ''}`}
                                            >
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="contactIntentPill"
                                                        className={styles.intentPillBg}
                                                        transition={
                                                            shouldReduceMotion
                                                                ? { duration: 0 }
                                                                : { type: 'spring', stiffness: 460, damping: 34 }
                                                        }
                                                    />
                                                )}
                                                <span className={styles.intentPillText}>{intent.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Compact Optional Inputs */}
                                <div className={styles.inputGroup}>
                                    <div className={styles.field}>
                                        <label htmlFor="composer-name" className={styles.fieldLabel}>
                                            Your Name <span className={styles.optionalTag}>(optional)</span>
                                        </label>
                                        <input
                                            id="composer-name"
                                            type="text"
                                            value={senderName}
                                            onChange={(event) => setSenderName(event.target.value)}
                                            placeholder="e.g., Alex Meyer · Logistics & BI"
                                            className={styles.textInput}
                                            autoComplete="name"
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label htmlFor="composer-context" className={styles.fieldLabel}>
                                            Context or Role Note <span className={styles.optionalTag}>(optional)</span>
                                        </label>
                                        <textarea
                                            id="composer-context"
                                            rows={2}
                                            value={contextNote}
                                            onChange={(event) => setContextNote(event.target.value)}
                                            placeholder={activeIntent.placeholder}
                                            className={styles.textArea}
                                        />
                                    </div>
                                </div>

                                {/* Live Assembled Message Preview */}
                                <div className={styles.previewBox} aria-label="Pre-formatted message preview">
                                    <div className={styles.previewSubject}>
                                        <span className={styles.previewMetaKey}>Subject:</span>
                                        <span className={styles.previewMetaVal}>{assembledMessage.subject}</span>
                                    </div>
                                    <p className={styles.previewBody}>{assembledMessage.body}</p>
                                </div>

                                {/* Dual 1-Click Dispatch Actions */}
                                <div className={styles.composerActions}>
                                    <button
                                        type="button"
                                        onClick={handleCopyMessageAndEmail}
                                        className={styles.copyBundleBtn}
                                    >
                                        {copiedTarget === 'bundle' ? (
                                            <>
                                                <Check size={16} className={styles.copiedIcon} aria-hidden="true" />
                                                <span>Copied Message + Email!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} aria-hidden="true" />
                                                <span>Copy Message + Email</span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleOpenEmailApp}
                                        className={styles.openMailBtn}
                                    >
                                        <Mail size={16} aria-hidden="true" />
                                        <span>Open in Email App</span>
                                        <Send size={13} aria-hidden="true" />
                                    </button>
                                </div>
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
                contextLabel={activeIntent.shortLabel}
            />
        </section>
    );
}
