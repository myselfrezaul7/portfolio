'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Link2, Check } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import styles from './article.module.css';

interface ArticleViewProps {
    post: BlogPost;
    prevPost: BlogPost | null;
    nextPost: BlogPost | null;
}

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
        case 'data & reporting':
            return styles.categoryData;
        case 'social venture':
            return styles.categoryVenture;
        case 'community operations':
            return styles.categoryCommunity;
        default:
            return '';
    }
}

export default function ArticleView({ post, prevPost, nextPost }: ArticleViewProps) {
    const { scrollYProgress } = useScroll();
    const [copied, setCopied] = useState(false);
    const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        };
    }, []);

    const handleCopyLink = async () => {
        const url = window.location.href;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
            } else {
                throw new Error('Clipboard API unavailable');
            }
            setCopied(true);
        } catch {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = url;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopied(true);
            } catch {
                // Fallback ignore
            }
        }

        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            {/* Scroll progress bar */}
            <motion.div
                className={styles.progressBar}
                style={{ scaleX: scrollYProgress }}
                aria-hidden="true"
            />
            <Navbar />
            <main id="main-content" className={styles.page}>
                <ErrorBoundary>
                    <article className={styles.container}>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link href="/blog" className={styles.backLink}>
                                <ArrowLeft size={16} />
                                All Writing
                            </Link>
                        </motion.div>

                        <header className={styles.articleHeader}>
                            <div className={styles.headerMeta}>
                                <div className={styles.metaLeft}>
                                    <span className={`${styles.category} ${getCategoryClass(post.category)}`}>
                                        {post.category}
                                    </span>
                                    <div className={styles.metaInfo}>
                                        <span className={styles.metaItem}>
                                            <Calendar size={13} />
                                            {formatDate(post.date)}
                                        </span>
                                        <span className={styles.metaDot} aria-hidden="true">•</span>
                                        <span className={styles.metaItem}>
                                            <Clock size={13} />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className={styles.shareButton}
                                    aria-label="Share article link"
                                    title="Copy article link"
                                >
                                    {copied ? (
                                        <Check size={14} className={styles.copiedIcon} />
                                    ) : (
                                        <Link2 size={14} />
                                    )}
                                    <span>{copied ? 'Copied!' : 'Share link'}</span>
                                </button>
                            </div>

                            <h1 className={styles.articleTitle}>{post.title}</h1>
                            <p className={styles.articleExcerpt}>{post.excerpt}</p>
                        </header>

                        <div className={styles.articleBody}>
                            {post.content.split('\n\n').map((block, idx) => {
                                if (block.startsWith('## ')) {
                                    const headingText = block.replace(/^##\s+/, '');
                                    const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                    return (
                                        <h2 key={idx} id={headingId} className={styles.sectionHeading}>
                                            {headingText}
                                        </h2>
                                    );
                                }
                                return (
                                    <p key={idx} className={styles.paragraph}>
                                        {block}
                                    </p>
                                );
                            })}
                        </div>

                        <footer className={styles.articleFooter}>
                            <div className={styles.footerShare}>
                                <span className={styles.footerShareLabel}>Found this interesting?</span>
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className={styles.shareButton}
                                    aria-label="Copy article link"
                                >
                                    {copied ? (
                                        <Check size={14} className={styles.copiedIcon} />
                                    ) : (
                                        <Link2 size={14} />
                                    )}
                                    <span>{copied ? 'Copied!' : 'Share link'}</span>
                                </button>
                            </div>

                            <nav className={styles.navigation} aria-label="Adjacent articles">
                                {prevPost ? (
                                    <Link href={`/blog/${prevPost.slug}`} className={`${styles.navCard} ${styles.navPrev}`}>
                                        <span className={styles.navDirection}>
                                            <ArrowLeft size={14} /> Previous
                                        </span>
                                        <span className={styles.navTitle}>{prevPost.title}</span>
                                    </Link>
                                ) : (
                                    <div className={styles.navPlaceholder} aria-hidden="true" />
                                )}

                                {nextPost ? (
                                    <Link href={`/blog/${nextPost.slug}`} className={`${styles.navCard} ${styles.navNext}`}>
                                        <span className={styles.navDirection}>
                                            Next <ArrowRight size={14} />
                                        </span>
                                        <span className={styles.navTitle}>{nextPost.title}</span>
                                    </Link>
                                ) : (
                                    <div className={styles.navPlaceholder} aria-hidden="true" />
                                )}
                            </nav>
                        </footer>
                    </article>
                </ErrorBoundary>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
