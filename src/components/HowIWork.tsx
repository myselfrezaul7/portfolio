'use client';

import { motion } from 'framer-motion';
import { Search, FileText, Rocket } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './HowIWork.module.css';

const steps = [
    {
        icon: Search,
        number: '01',
        title: 'Research & Strategy',
        description: 'User research, competitive analysis, moodboard and style tile to define the operational identity.',
    },
    {
        icon: FileText,
        number: '02',
        title: 'Definition & Planning',
        description: 'Process mapping, workflow design, and usability testing to validate solutions before implementation.',
    },
    {
        icon: Rocket,
        number: '03',
        title: 'Implementation',
        description: 'Pixel-perfect execution with technical deployment and system integration for development teams.',
    },
];

export default function HowIWork() {
    return (
        <section className={styles.howIWork}>
            <div className={styles.container}>
                <ScrollReveal>
                    <h2 className={styles.sectionTitle}>How I work.</h2>
                </ScrollReveal>

                <div className={styles.stepsGrid}>
                    {steps.map((step, index) => (
                        <ScrollReveal key={step.title} delay={index * 0.15}>
                            <motion.div
                                className={styles.stepCard}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className={styles.stepNumber}>{step.number}</span>
                                <div className={styles.iconWrapper}>
                                    <step.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
