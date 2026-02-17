'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, Code2, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import styles from './Services.module.css';

const services = [
    {
        icon: Settings,
        title: 'Supply Chain & Process Optimization',
        description: 'I map and improve supply chain workflows, identify operational bottlenecks, and design repeatable systems that keep things moving smoothly.',
        skills: ['SAP Signavio', 'BPMN 2.0', 'Lean Management'],
    },
    {
        icon: BarChart3,
        title: 'Data Analytics & Business Intelligence',
        description: 'I turn operational data into actionable insights by building dashboards for supply chain KPIs, process performance, and data-driven decision support.',
        skills: ['Power BI', 'KNIME', 'Excel/SQL'],
    },
    {
        icon: Code2,
        title: 'Digital Transformation & Tech Integration',
        description: 'I translate business requirements into technical solutions, from automating workflows to deploying web platforms that support day-to-day operations.',
        skills: ['ERP Systems', 'Vercel/GitHub', 'Process Automation'],
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
                            I sit at the intersection of operations and technology, turning complex business challenges into streamlined, data-driven systems.
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
