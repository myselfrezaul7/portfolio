import Link from 'next/link';
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Briefcase,
    Home,
    Mail,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './not-found.module.css';

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

export default function NotFound() {
    return (
        <>
            <a href="#main-content" className="skip-nav">
                Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className={styles.page}>
                <div className={styles.backdropGrid} aria-hidden="true" />
                <div className={styles.ambientGlow} aria-hidden="true" />

                <div className={styles.container}>
                    <div className={styles.statusBadge}>
                        <span className={styles.statusDot} aria-hidden="true" />
                        <span>Route Not Found</span>
                    </div>

                    <span className={styles.statusCode} aria-hidden="true">
                        404
                    </span>

                    <h1 className={styles.title}>This page could not be found</h1>

                    <p className={styles.description}>
                        The page you requested may have moved, been renamed, or never existed.
                        Return to the home page or jump straight to a section below.
                    </p>

                    <div className={styles.primaryActions}>
                        <Link href="/" className={styles.primaryButton}>
                            <ArrowLeft size={16} aria-hidden="true" />
                            <span>Back Home</span>
                        </Link>
                        <Link href="/blog" className={styles.secondaryButton}>
                            <BookOpen size={16} aria-hidden="true" />
                            <span>Read Insights</span>
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
            <Footer />
        </>
    );
}
