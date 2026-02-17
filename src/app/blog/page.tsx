'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import styles from './blog.module.css';

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function BlogPage() {
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

    return (
        <>
            <Navbar />
            <main className={styles.page}>
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
                                    <span className={styles.category}>{post.category}</span>
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

                                <h2 className={styles.postTitle}>{post.title}</h2>

                                <div className={styles.postContent}>
                                    {post.content.split('\n\n').map((paragraph, pIndex) => (
                                        <p key={pIndex}>{paragraph}</p>
                                    ))}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}

