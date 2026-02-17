'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Blog.module.css';

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function Blog() {
    return (
        <section id="blog" className={styles.blog}>
            <div className={styles.container}>
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Insights & Writing</h2>
                        <p className={styles.sectionDescription}>
                            Thoughts on operations, technology, and building things from scratch.
                        </p>
                    </div>
                </ScrollReveal>

                <div className={styles.grid}>
                    {blogPosts.map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 0.1}>
                            <Link href={`/blog#${post.slug}`} className={styles.cardLink}>
                                <motion.div
                                    className={styles.card}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={styles.cardTop}>
                                        <span className={styles.category}>{post.category}</span>
                                    </div>

                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                                    <div className={styles.cardMeta}>
                                        <span className={styles.metaItem}>
                                            <Calendar size={14} />
                                            {formatDate(post.date)}
                                        </span>
                                        <span className={styles.metaItem}>
                                            <Clock size={14} />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.3}>
                    <div className={styles.viewAll}>
                        <Link href="/blog" className={styles.viewAllLink}>
                            Read All Posts
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
