'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Link2, Check } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import styles from './blog.module.css';

function formatDate(dateStr: string) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getCategoryClass(category: string) {
    switch (category.toLowerCase()) {
        case 'operations':
            return styles.categoryOperations;
        case 'entrepreneurship':
            return styles.categoryEntrepreneurship;
        case 'productivity':
            return styles.categoryProductivity;
        default:
            return '';
    }
}

function FormulaCallout() {
    return (
        <div className={styles.formulaCard} role="region" aria-label="Inventory Reorder Point Formula">
            <div className={styles.formulaHeader}>
                <span className={styles.formulaBadge}>Operational Formula</span>
                <span className={styles.formulaType}>Deterministic Inventory Control</span>
            </div>
            <div className={styles.formulaDisplay}>
                <span className={styles.formulaMath}>ROP = (d * L) + SS</span>
            </div>
            <div className={styles.legendContainer}>
                <h4 className={styles.legendHeading}>Variable Breakdown</h4>
                <dl className={styles.legendList}>
                    <div className={styles.legendItem}>
                        <dt className={styles.legendTerm}>ROP</dt>
                        <dd className={styles.legendDef}>Reorder Point: The inventory threshold in units that triggers a replenishment purchase order</dd>
                    </div>
                    <div className={styles.legendItem}>
                        <dt className={styles.legendTerm}>d</dt>
                        <dd className={styles.legendDef}>Average Daily Usage: Mean units of reagent consumed across testing shifts</dd>
                    </div>
                    <div className={styles.legendItem}>
                        <dt className={styles.legendTerm}>L</dt>
                        <dd className={styles.legendDef}>Average Lead Time: Verified transit duration in days from order placement to cold room intake</dd>
                    </div>
                    <div className={styles.legendItem}>
                        <dt className={styles.legendTerm}>SS</dt>
                        <dd className={styles.legendDef}>Safety Stock: Buffer stock protecting against supplier delays, monsoon floods, and customs bottlenecks</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default function BlogPage() {
    const { scrollYProgress } = useScroll();
    const [activeSlug, setActiveSlug] = useState<string>(blogPosts[0]?.slug || '');
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSlug(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0,
            }
        );

        blogPosts.forEach((post) => {
            const el = document.getElementById(post.slug);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleCopyLink = async (slug: string) => {
        const url = `${window.location.origin}/blog#${slug}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopiedSlug(slug);
            setTimeout(() => {
                setCopiedSlug(null);
            }, 2000);
        } catch {
            // Fallback if clipboard API is restricted
        }
    };

    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            {/* Fixed 3px reading progress bar */}
            <motion.div
                className={styles.progressBar}
                style={{ scaleX: scrollYProgress }}
                aria-hidden="true"
            />
            <Navbar />
            <main id="main-content" className={styles.page}>
                <ErrorBoundary>
                    <div className={styles.container}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="/" className={styles.backLink}>
                                <ArrowLeft size={18} />
                                Back to Home
                            </Link>
                        </motion.div>

                        <motion.div
                            className={styles.header}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className={styles.pageTitle}>Insights & Writing</h1>
                            <p className={styles.pageDescription}>
                                Thoughts on operations, technology, and building things from scratch.
                            </p>
                        </motion.div>

                        {/* Interactive Table of Contents quick-jump bar */}
                        <nav className={styles.tocNav} aria-label="Table of contents">
                            <div className={styles.tocHeader}>
                                <span className={styles.tocLabel}>Quick Jump</span>
                            </div>
                            <div className={styles.tocPills}>
                                {blogPosts.map((post, idx) => {
                                    const isActive = activeSlug === post.slug;
                                    return (
                                        <button
                                            key={post.slug}
                                            type="button"
                                            onClick={() => {
                                                const el = document.getElementById(post.slug);
                                                if (el) {
                                                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    window.history.pushState(null, '', `#${post.slug}`);
                                                    setActiveSlug(post.slug);
                                                }
                                            }}
                                            className={`${styles.tocPill} ${isActive ? styles.tocPillActive : ''}`}
                                            aria-current={isActive ? 'location' : undefined}
                                        >
                                            <span className={styles.tocIndex}>0{idx + 1}</span>
                                            <span className={styles.tocTitleText}>{post.title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>

                        <div className={styles.postsList}>
                            {blogPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    id={post.slug}
                                    className={styles.postCard}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                >
                                    <div className={styles.postHeader}>
                                        <div className={styles.headerBadges}>
                                            <span className={`${styles.category} ${getCategoryClass(post.category)}`}>
                                                {post.category}
                                            </span>
                                            <div className={styles.postMeta}>
                                                <span className={styles.metaItem}>
                                                    <Calendar size={14} />
                                                    {formatDate(post.date)}
                                                </span>
                                                <span className={styles.metaItem}>
                                                    <Clock size={14} />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Copy link to section button */}
                                        <div className={styles.copyWrapper}>
                                            <motion.button
                                                type="button"
                                                onClick={() => handleCopyLink(post.slug)}
                                                className={styles.copyButton}
                                                whileTap={{ scale: 0.94 }}
                                                aria-label={`Copy direct link to ${post.title}`}
                                                title="Copy direct link to section"
                                            >
                                                {copiedSlug === post.slug ? (
                                                    <Check size={14} className={styles.copiedIcon} />
                                                ) : (
                                                    <Link2 size={14} />
                                                )}
                                                <span className={styles.copyButtonText}>
                                                    {copiedSlug === post.slug ? 'Copied' : 'Share link'}
                                                </span>
                                            </motion.button>
                                            <AnimatePresence>
                                                {copiedSlug === post.slug && (
                                                    <motion.div
                                                        className={styles.copiedToast}
                                                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -4, scale: 0.9 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        Copied!
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <h2 className={styles.postTitle}>{post.title}</h2>

                                    <div className={styles.postContent}>
                                        {post.content.split('\n\n').map((paragraph, pIndex) => {
                                            if (paragraph.includes('Reorder Point = (Average Daily Usage')) {
                                                return (
                                                    <div key={pIndex} className={styles.formulaWrapper}>
                                                        <FormulaCallout />
                                                    </div>
                                                );
                                            }
                                            return <p key={pIndex}>{paragraph}</p>;
                                        })}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </ErrorBoundary>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}

