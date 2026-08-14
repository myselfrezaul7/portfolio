'use client';

import { motion } from 'framer-motion';
import { Search, FileText, Rocket } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './HowIWork.module.css';

const steps = [
    {
        icon: Search,
        number: '01',
        title: 'Diagnose & Analyse',
        description: 'Understand current operations through data collection, stakeholder interviews, and AI-assisted process mapping to identify bottlenecks and inefficiencies faster.',
    },
    {
        icon: FileText,
        number: '02',
        title: 'Design & Optimise',
        description: 'Develop improved workflows, build data models, and rapidly prototype solutions using SAP Signavio, Power BI, and AI-powered development tools.',
    },
    {
        icon: Rocket,
        number: '03',
        title: 'Implement & Scale',
        description: 'Deploy solutions, integrate with existing systems, and leverage AI-driven monitoring to ensure continuous improvement at scale.',
    },
];

export default function HowIWork() {
    return (
        <section className={styles.howIWork} aria-label="How I work">
            <div className={styles.container}>
                <ScrollReveal>
                    <h2 className={styles.sectionTitle}>How I work.</h2>
                </ScrollReveal>

                <div className={styles.stepsHorizontal}>
                    {steps.map((step, index) => (
                        <div key={step.title} className={styles.snapItem}>
                            <ScrollReveal delay={index * 0.15} className={styles.revealWrapper}>
                                <motion.div
                                    className={styles.stepCard}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.97 }}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
