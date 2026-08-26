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
        description: 'Understand existing operational workflows through data audits, stakeholder interviews, and BPMN 2.0 process mapping to uncover root-cause bottlenecks and resource waste.',
    },
    {
        icon: FileText,
        number: '02',
        title: 'Design & Optimise',
        description: 'Design future-state process models and data structures. Rapidly prototype interactive dashboards in Power BI and configure SAP data flows.',
    },
    {
        icon: Rocket,
        number: '03',
        title: 'Implement & Scale',
        description: 'Deploy solutions with clear documentation, establish KPI tracking governance, and run agile review cycles to ensure sustainable operational performance.',
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
