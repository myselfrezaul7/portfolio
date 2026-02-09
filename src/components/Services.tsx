'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, Code2, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Services.module.css';

const services = [
    {
        icon: Settings,
        title: 'Process Management',
        description: 'I optimize business workflows using BPMN 2.0 and SAP Signavio. From mapping processes to automating workflows, I ensure operational efficiency.',
        skills: ['SAP Signavio', 'BPMN 2.0', 'Workflow Automation'],
    },
    {
        icon: BarChart3,
        title: 'Data & Analytics',
        description: 'Transform raw data into actionable insights using Power BI and KNIME. I create dashboards and reports that drive data-informed decisions.',
        skills: ['Power BI', 'KNIME', 'Data Analysis'],
    },
    {
        icon: Code2,
        title: 'Tech & Deployment',
        description: 'I build and deploy web applications using modern technologies. From development to deployment on Vercel, I handle the complete technical lifecycle.',
        skills: ['Vercel', 'GitHub', 'HTML5/CSS4', 'Bootstrap'],
    },
];

export default function Services() {
    return (
        <section id="services" className={styles.services}>
            <div className={styles.container}>
                {/* Section Header */}
                <ScrollReveal>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>What I do.</h2>
                        <p className={styles.sectionDescription}>
                            A hybrid approach to business and technology: from strategy research
                            to process optimization, to technical deployment.
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
