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
        description: 'Understand current operations through data collection, stakeholder interviews, and process mapping to identify bottlenecks and inefficiencies.',
    },
    {
        icon: FileText,
        number: '02',
        title: 'Design & Optimise',
        description: 'Develop improved workflows, build data models, and prototype solutions using tools like SAP Signavio and Power BI.',
    },
    {
        icon: Rocket,
        number: '03',
        title: 'Implement & Scale',
        description: 'Deploy solutions, integrate with existing systems, and set up monitoring to ensure continuous improvement.',
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
