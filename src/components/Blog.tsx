'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Blog.module.css';

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

export default function Blog() {
    return (
        <section id="blog" className={styles.blog} aria-label="Blog and insights">
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Insights & Writing</h2>
                        <p className={styles.sectionDescription}>
                            Thoughts on operations, technology, and building things from scratch.
                        </p>
                    </div>
                </ScrollReveal>

                <div className={styles.articleList}>
                    {blogPosts.map((post, index) => (
                        <div key={post.id} className={styles.rowItem}>
                            <Link href={`/blog/${post.slug}`} className={styles.rowLink}>
                                <motion.div
                                    className={styles.rowCard}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ duration: 0.3, delay: index * 0.08 }}
                                >
                                    <div className={styles.rowMeta}>
                                        <span className={`${styles.category} ${getCategoryClass(post.category)}`}>
                                            {post.category}
                                        </span>
                                        <span className={styles.metaDot} aria-hidden="true">•</span>
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

                                    <div className={styles.rowContent}>
                                        <div className={styles.rowHeader}>
                                            <h3 className={styles.rowTitle}>{post.title}</h3>
                                            <ArrowUpRight size={18} className={styles.arrow} />
                                        </div>
                                        <p className={styles.rowExcerpt}>{post.excerpt}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    ))}
                </div>

                <ScrollReveal delay={0.2}>
                    <div className={styles.viewAll}>
                        <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                            <Link href="/blog" className={styles.viewAllLink}>
                                All writing ({blogPosts.length})
                                <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
