'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Blog.module.css';

const posts = [
    {
        id: 1,
        title: 'What Running a Lab Supply Chain Actually Taught Me',
        excerpt: `When I joined Renaissance Diagnostic Care in Dhaka, the supply chain was basically a WhatsApp group and a spreadsheet that nobody updated. Reagents would expire on the shelf, vendors would delay shipments for weeks, and the lab techs were always scrambling at the last minute to find what they needed.

My first move was simple. I started tracking everything. What we ordered, when it arrived, how fast we used it, and when things expired. Sounds obvious, but nobody had done it before. Within a few months I could predict exactly when we would run out of something and place orders ahead of time instead of reacting to emergencies.

I also renegotiated with a few vendors. Some of them were reliable but expensive, others were cheap but would disappear for days. I ended up building a small vendor scoring system in Excel to keep track. Nothing fancy, but it worked. By the end of my second year, we had cut waste by a good margin and the lab was running smoother than it had in years.

The biggest lesson? Operations is not about big frameworks or fancy tools. It is about paying attention to the boring stuff that everyone else ignores.`,
        date: '2025-02-10',
        readTime: '8 min read',
        category: 'Operations',
    },
    {
        id: 2,
        title: 'Building PetBhai From My Room in Germany',
        excerpt: `I have always wanted to build something for the pet community back home in Bangladesh. The pet supplies market there is growing fast, but most people still buy from random Facebook sellers with no proper system. So I decided to build PetBhai, a proper e-commerce platform for pet supplies.

The catch? I was sitting in Soest, Germany, 7,000 km away from my target market. No co-founder, no funding, just me and my laptop. I picked Next.js for the frontend, set up Firebase for auth and data, and started building.

The hardest part was not the code. It was designing the inventory and order flow. I had to think about how stock levels update when someone places an order, how to handle out-of-stock items gracefully, and how to map the delivery process for a country where structured logistics barely exist outside Dhaka.

Right now PetBhai is still a working prototype. I am not pretending it is a finished product. But building it end-to-end taught me more about product thinking, supply chain logic, and shipping under constraints than any course I have taken. Sometimes you just have to start with what you have.`,
        date: '2025-01-20',
        readTime: '10 min read',
        category: 'Entrepreneurship',
    },
    {
        id: 3,
        title: 'I Run Sprints Even When Nobody Is Watching',
        excerpt: `Most people think Scrum is something you do with a team. Standups, sprint planning, retros, the whole ceremony. And yeah, that is the standard use case. But I have been running solo sprints for over a year now and honestly it is one of the best habits I have picked up.

Here is how it works for me. Every two weeks I sit down and decide what I want to ship. Not a vague goal like "work on the website" but something specific. Like "finish the adoption flow for Catwaala" or "set up the order tracking page on PetBhai." I write it down, break it into smaller tasks, and get to work.

At the end of the sprint I do a quick retro. What went well? What slowed me down? Did I overcommit? Usually the answer to that last one is yes. But that is fine, because now I know for next time.

The real value of solo sprints is not productivity hacks or time management. It is honesty. When you set a goal and review it two weeks later, you cannot hide from what you actually did or did not do. It keeps me focused and stops me from spending three weeks perfecting a button animation when the real work is somewhere else.`,
        date: '2025-01-05',
        readTime: '6 min read',
        category: 'Productivity',
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
                        <h2 className={styles.sectionTitle}>Insights &amp; Writing</h2>
                        <p className={styles.sectionDescription}>
                            Thoughts on operations, technology, and building things from scratch.
                        </p>
                    </div>
                </ScrollReveal>

                <div className={styles.grid}>
                    {posts.map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 0.1}>
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
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
