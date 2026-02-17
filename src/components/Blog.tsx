'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Blog.module.css';

const posts = [
    {
        id: 1,
        title: 'How I Designed the Operations Workflow for NexTep Edu',
        excerpt: 'A deep dive into mapping the student admission pipeline, from lead capture to visa processing, using BPMN and process optimization.',
        date: '2025-01-15',
        readTime: '5 min read',
        category: 'Process Design',
        slug: '#',
    },
    {
        id: 2,
        title: 'From Idea to Launch: Building PetBhai as a Solo Founder',
        excerpt: 'Lessons learned from building an e-commerce platform from scratch, including supply chain design, inventory logic, and tech decisions.',
        date: '2025-01-08',
        readTime: '7 min read',
        category: 'Entrepreneurship',
        slug: '#',
    },
    {
        id: 3,
        title: 'Why Agile (Scrum) Works for Solo Projects Too',
        excerpt: 'How I apply Scrum principles even when working alone, breaking work into sprints and iterating fast to ship better products.',
        date: '2024-12-20',
        readTime: '4 min read',
        category: 'Strategy',
        slug: '#',
    },
];

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
                    {posts.map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 0.1}>
                            <motion.a
                                href={post.slug}
                                className={styles.card}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.cardTop}>
                                    <span className={styles.category}>{post.category}</span>
                                    <ArrowUpRight size={18} className={styles.arrow} />
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
                            </motion.a>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
