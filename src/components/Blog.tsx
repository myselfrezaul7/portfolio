'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Blog.module.css';

const posts = [
    {
        id: 1,
        title: 'What Running a Lab Supply Chain Actually Taught Me',
        excerpt: 'I spent two years managing procurement and inventory at a diagnostic clinic in Dhaka. Vendors would ghost, reagents would expire, and nobody tracked anything properly. Here is how I fixed the mess and what it taught me about operations that no textbook ever did.',
        date: '2025-02-10',
        readTime: '5 min read',
        category: 'Operations',
        slug: '#',
    },
    {
        id: 2,
        title: 'Building PetBhai From My Room in Germany',
        excerpt: 'I wanted to build a proper pet supplies platform for Bangladesh, but I had no team, no funding, and I was sitting 7,000 km away. So I just started. Picked a stack, designed the inventory logic, mapped out the delivery flow, and built the whole thing myself. It is still a prototype, but the lessons from shipping it are real.',
        date: '2025-01-20',
        readTime: '6 min read',
        category: 'Entrepreneurship',
        slug: '#',
    },
    {
        id: 3,
        title: 'I Run Sprints Even When Nobody Is Watching',
        excerpt: 'People think Scrum is only for teams. I disagree. Even when I am working solo on NexTep Edu or PetBhai, I break everything into two-week sprints, set goals, and do quick retros. It keeps me honest and stops me from building things nobody asked for.',
        date: '2025-01-05',
        readTime: '4 min read',
        category: 'Productivity',
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
