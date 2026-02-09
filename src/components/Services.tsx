'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, Code2, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Services.module.css';

const services = [
    {
        icon: Settings,
        title: 'Process Management',
        description: 'I turn complex workflows into clear, repeatable systems. Using BPMN 2.0 and SAP Signavio, I map, analyse, and improve how work gets done.',
        skills: ['SAP Signavio', 'BPMN 2.0', 'Workflow Design'],
    },
    {
        icon: BarChart3,
        title: 'Data Analysis',
        description: 'I help teams make better decisions with data. Using Power BI and KNIME, I build dashboards and reports that turn numbers into clear insights.',
        skills: ['Power BI', 'KNIME', 'Data Analysis'],
    },
    {
        icon: Code2,
        title: 'Technical Deployment',
        description: 'I handle small web projects from start to finish. Whether it is a landing page or a simple web app, I can build and deploy it using GitHub and Vercel.',
        skills: ['Vercel', 'GitHub', 'HTML/CSS'],
    },
];

export default function Services() {
    return (
        <section id="services" className={styles.services}>
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>What I do</h2>
                        <p className={styles.sectionDescription}>
                            I combine process design with operational analysis to help organisations run more efficiently.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Services Grid */}
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <ScrollReveal key={service.title} delay={index * 0.15}>
                            <motion.div
                                className={styles.card}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.iconWrapper}>
                                    <service.icon size={28} strokeWidth={1.5} />
                                </div>

                                <h3 className={styles.cardTitle}>{service.title}</h3>

                                <p className={styles.cardDescription}>{service.description}</p>

                                <div className={styles.skills}>
                                    {service.skills.map((skill) => (
                                        <span key={skill} className={styles.skillTag}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.cardFooter}>
                                    <span className={styles.learnMore}>
                                        Learn more
                                        <ArrowUpRight size={14} />
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
