'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
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
        case 'data & reporting':
            return styles.categoryData;
        case 'social venture':
            return styles.categoryVenture;
        case 'community operations':
            return styles.categoryCommunity;
        case 'web & process':
            return styles.categoryWeb;
        default:
            return '';
    }
}

export default function BlogIndexPage() {
    const router = useRouter();

    useEffect(() => {
        const hash = window.location.hash.replace(/^#/, '');
        if (!hash) return;

        const redirects: Record<string, string> = {
            'lab-supply-chain': '/blog/lab-data',
            'lab-data': '/blog/lab-data',
            'building-petbhai': '/blog/building-petbhai',
            'decentralized-community-operations': '/blog/community-moderators',
            'community-moderators': '/blog/community-moderators',
            'building-nextep-edu': '/blog/building-nextep-edu',
        };

        if (redirects[hash]) {
            router.replace(redirects[hash]);
        }
    }, [router]);

    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            <Navbar />
            <main id="main-content" className={styles.page}>
                <ErrorBoundary>
                    <div className={styles.container}>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link href="/" className={styles.backLink}>
                                <ArrowLeft size={16} />
                                Back to Home
                            </Link>
                        </motion.div>

                        <header className={styles.header}>
                            <h1 className={styles.pageTitle}>Insights & Writing</h1>
                            <p className={styles.pageDescription}>
                                Thoughts on operations, technology, and building things from scratch.
                            </p>
                        </header>

                        <div className={styles.postList}>
                            {blogPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    className={styles.postCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className={styles.postHeader}>
                                        <span className={`${styles.category} ${getCategoryClass(post.category)}`}>
                                            {post.category}
                                        </span>
                                        <div className={styles.postMeta}>
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

                                    <h2 className={styles.postTitle}>
                                        <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className={styles.postExcerpt}>{post.excerpt}</p>

                                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                        Read Article
                                        <ArrowRight size={14} className={styles.arrowIcon} />
                                    </Link>
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
