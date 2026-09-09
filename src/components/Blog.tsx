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

                <div className={styles.scrollStrip}>
                    {blogPosts.map((post, index) => (
                        <div key={post.id} className={styles.snapItem}>
                            <Link href={`/blog#${post.slug}`} className={styles.cardLink}>
                                <motion.div
                                    className={styles.card}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className={styles.cardTop}>
                                        <div className={styles.badgeGroup}>
                                            <span className={`${styles.category} ${getCategoryClass(post.category)}`}>
                                                {post.category}
                                            </span>
                                            <span className={styles.readTimeBadge}>
                                                <Clock size={12} />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <ArrowUpRight size={18} className={styles.arrow} />
                                    </div>

                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                                    <div className={styles.cardMeta}>
                                        <span className={styles.metaItem}>
                                            <Calendar size={14} />
                                            {formatDate(post.date)}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    ))}
                </div>

                <ScrollReveal delay={0.3}>
                    <div className={styles.viewAll}>
                        <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                            <Link href="/blog" className={styles.viewAllLink}>
                                Read All Posts
                                <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
