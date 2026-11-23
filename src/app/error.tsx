'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Briefcase,
    Home,
    Mail,
    RefreshCw,
} from 'lucide-react';
import styles from './error.module.css';

const RECOVERY_LINKS = [
    {
        title: 'Back Home',
        subtitle: 'Portfolio overview & executive profile',
        href: '/',
        icon: Home,
    },
    {
        title: 'Explore Projects',
        subtitle: 'SAP BW/4HANA, BPMN 2.0 & web systems',
        href: '/#work',
        icon: Briefcase,
    },
    {
        title: 'Read Insights',
        subtitle: 'Essays on operations, data & delivery',
        href: '/blog',
        icon: BookOpen,
    },
    {
        title: 'Contact',
        subtitle: 'Book a chat or reach out directly',
        href: '/#contact',
        icon: Mail,
    },
] as const;

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Unhandled route error caught by error.tsx:', error);
        }
    }, [error]);

    return (
        <div className={styles.shell}>
            {/* Safe, zero-dependency fallback header */}
            <header className={styles.fallbackHeader}>
                <div className={styles.fallbackHeaderInner}>
                    <Link href="/" className={styles.brandLink} aria-label="Md Rezaul Karim Home">
                        <span>M</span>
                        <span className={styles.brandDot} aria-hidden="true">•</span>
                        <span>K</span>
                    </Link>

                    <nav className={styles.headerNav} aria-label="Fallback navigation">
                        <Link href="/" className={styles.headerNavLink}>
                            Home
                        </Link>
                        <Link href="/#work" className={styles.headerNavLink}>
                            Projects
                        </Link>
                        <Link href="/blog" className={styles.headerNavLink}>
                            Insights
                        </Link>
                        <Link href="/#contact" className={styles.headerNavLink}>
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            <main id="main-content" className={styles.main} role="alert" aria-live="polite">
                <div className={styles.backdropGrid} aria-hidden="true" />
                <div className={styles.ambientGlow} aria-hidden="true" />

                <div className={styles.container}>
                    <div className={styles.iconTile} aria-hidden="true">
                        <AlertTriangle size={28} strokeWidth={1.8} />
                    </div>

                    <div className={styles.statusBadge}>
                        <span>Runtime Error</span>
                    </div>

                    <h1 className={styles.title}>Something unexpected happened</h1>

                    <p className={styles.description}>
                        This view encountered an unexpected client or rendering error.
                        You can retry loading this section right away or navigate to another
                        part of the portfolio.
                    </p>

                    {error.digest && (
                        <div className={styles.digestChip}>
                            <span>Reference:</span>
                            <span>{error.digest}</span>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className={styles.primaryButton}
                        >
                            <RefreshCw size={16} aria-hidden="true" />
                            <span>Try Again</span>
                        </button>
                        <Link href="/" className={styles.secondaryButton}>
                            <ArrowLeft size={16} aria-hidden="true" />
                            <span>Back Home</span>
                        </Link>
                    </div>

                    <nav
                        className={styles.quickLinksSection}
                        aria-label="Recovery navigation"
                    >
                        <h2 className={styles.quickLinksHeading}>Quick Destinations</h2>
                        <div className={styles.quickLinksGrid}>
                            {RECOVERY_LINKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={styles.quickCard}
                                    >
                                        <span className={styles.quickCardIcon} aria-hidden="true">
                                            <Icon size={18} />
                                        </span>
                                        <span className={styles.quickCardBody}>
                                            <span className={styles.quickCardTitle}>
                                                {item.title}
                                            </span>
                                            <span className={styles.quickCardSubtitle}>
                                                {item.subtitle}
                                            </span>
                                        </span>
                                        <ArrowRight
                                            size={15}
                                            className={styles.quickCardArrow}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </main>

            {/* Safe fallback footer */}
            <footer className={styles.fallbackFooter} role="contentinfo">
                <div className={styles.fallbackFooterInner}>
                    <span>Md Rezaul Karim · Bridging Business Operations &amp; Technology</span>
                    <span>Soest, Germany</span>
                </div>
            </footer>
        </div>
    );
}
